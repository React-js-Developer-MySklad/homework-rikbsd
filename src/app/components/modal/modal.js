import html from './modal.html';
import './modal.css';
import {addCounterParty} from '../table/table';

const element = document.createElement('div')
element.innerHTML = html;

const formElement = element.querySelector('form');


const showModal = function(item) {
    formElement.querySelector('input[id="id"]').value = item.id;
    formElement.querySelector('input[id="name"]').value = item.name;
    formElement.querySelector('input[id="inn"]').value = item.inn;
    formElement.querySelector('input[id="kpp"]').value = item.kpp;
    formElement.querySelector('textarea[id="address"]').value = item.address;
    formElement.querySelector('button[name="create"]').innerHTML = "Сохранить";
    FlowbiteInstances.getInstance("Modal", "default-modal").show();
}


const formClear = function () {
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

    addCounterParty(record);

    FlowbiteInstances.getInstance("Modal", "default-modal").hide();

    formElement.reset();
    formElement.querySelector('input[id="id"]').value = "";

    return false;
}, true);


const modal = () => element;
export {showModal, formClear, modal};
export default modal;
