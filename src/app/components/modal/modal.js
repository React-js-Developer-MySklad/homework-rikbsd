import html from './modal.html';
import './modal.css';
import {v4 as uuidv4} from 'uuid';

const element = document.createElement('div')
element.innerHTML = html;

const formElement = element.querySelector('form');

formElement.addEventListener('submit', (e) => {
    e.preventDefault();

    let record = {
        id: uuidv4(),
        name: formElement.querySelector('input[id="name"]').value,
        inn: formElement.querySelector('input[id="inn"]').value,
        kpp: formElement.querySelector('input[id="kpp"]').value,
        address: formElement.querySelector('textarea[id="address"]').value
    };

    if (record.name.length == 0 ||
        record.inn.length != 11 ||
        record.kpp.length != 9 ||
        record.address.length < 1
    ) {
        e.stopPropagation();
        return false;
    }

    let counterParty = null;
    try {
        counterParty = JSON.parse(localStorage.getItem('counterParty'));
    } catch (ignore) {
    }

    if (counterParty == null || typeof counterParty !== 'object' || counterParty.length === 0) {
        counterParty = [];
    }

    counterParty.push(record);

    localStorage.setItem('counterParty', JSON.stringify(counterParty));

    refreshCounterParty();

    formElement.reset();

    return false;
}, true);

export default () => element;