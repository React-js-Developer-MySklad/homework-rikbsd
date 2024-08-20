import html from './modal.html';
import './modal.css';
import {v4 as uuidv4} from 'uuid';

const element = document.createElement('div')
element.innerHTML = html;

const formElement = element.querySelector('form');

window.showModal = function(id) {
    let counterParty = getCounterparty();

    for (const item of counterParty) {
        if (item.id !== id) {
            continue;
        }

        formElement.querySelector('input[id="id"]').value = item.id;
        formElement.querySelector('input[id="name"]').value = item.name;
        formElement.querySelector('input[id="inn"]').value = item.inn;
        formElement.querySelector('input[id="kpp"]').value = item.kpp;
        formElement.querySelector('textarea[id="address"]').value = item.address;
        formElement.querySelector('button[name="create"]').innerHTML = "Сохранить";
        FlowbiteInstances.getInstance("Modal", "default-modal").show();

        return;
    }
}


window.formClear = function () {
    // Если форма заполнялась с нуля - не сбрасываем
    if (formElement.querySelector('input[id="id"]').value !== "") {
        formElement.reset();
        formElement.querySelector('input[id="id"]').value = "";
    }

    formElement.querySelector('button[name="create"]').innerHTML = "Создать";
}


formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    let record = {
        id: formElement.querySelector('input[id="id"]').value,
        name: formElement.querySelector('input[id="name"]').value,
        inn: formElement.querySelector('input[id="inn"]').value,
        kpp: formElement.querySelector('input[id="kpp"]').value,
        address: formElement.querySelector('textarea[id="address"]').value
    };

    if (record.name.length === 0 ||
        record.inn.length !== 11 ||
        record.kpp.length !== 9 ||
        record.address.length < 1
    ) {
        e.stopPropagation();
        return false;
    }

    let counterParty = getCounterparty()

    if (record.id !== '') {
        counterParty.forEach((item, i) => {
            if (item.id === record.id) {
                counterParty[i] = record;
            }
        })
    } else {
        record.id = uuidv4();
        counterParty.push(record);
    }

    localStorage.setItem('counterParty', JSON.stringify(counterParty));

    refreshCounterParty();

    FlowbiteInstances.getInstance("Modal", "default-modal").hide();

    formElement.reset();
    formElement.querySelector('input[id="id"]').value = "";

    return false;
}, true);


export default () => element;