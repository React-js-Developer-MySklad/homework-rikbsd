import html from './table.html';
import trash from './trash.html';
import './table.css';

import {v4 as uuidv4} from "uuid";

import {getCounterParty, setCounterParty} from "../../lib/counterparty_storage/counterparty_storage";
import {showModal} from '../modal/modal'

const divElement = document.createElement('div');

divElement.innerHTML = html;

const tHeadElement = divElement.querySelector('thead');
const tBodyElement = divElement.querySelector('tbody');
const headRowElement = document.createElement('tr');
const templateRow = divElement.querySelector('template[id="template-row"]');
const templateHeadCol = divElement.querySelector('template[id="template-head-column"]');
const templateRowCol = divElement.querySelector('template[id="template-row-column"]');

const createRowColumn = (rowElement, template, content) => {
    // Clone row
    const rowClone = template.content.children[0].cloneNode(true);
    rowClone.innerHTML = content;

    rowElement.appendChild(rowClone);

    return rowClone;
}

for (const column of ['Наименование', 'ИНН', 'КПП', 'Адрес', '']) {
    createRowColumn(headRowElement, templateHeadCol, column);
}
tHeadElement.appendChild(headRowElement);


const refreshCounterParty = (data) => {
    if (data !== undefined) {
        setCounterParty(data);
    }

    tBodyElement.innerHTML = "";
    for (const item of getCounterParty()) {
        const newRow = createRowColumn(tBodyElement, templateRow, '');

        createRowColumn(newRow, templateRowCol, item.name);
        createRowColumn(newRow, templateRowCol, item.inn);
        createRowColumn(newRow, templateRowCol, item.kpp);
        createRowColumn(newRow, templateRowCol, item.address);
        createRowColumn(newRow, templateRowCol, trash);

        newRow.querySelector(".trash-button").addEventListener('click', (e) => {
            e.stopPropagation();
            refreshCounterParty(getCounterParty().filter(itm => itm.id !== item.id));
        });

        newRow.addEventListener('click', (e) => {
            showModal(item);
        });
    }
}


const addCounterParty = (record) => {
    let counterParty = getCounterParty()

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

    refreshCounterParty(counterParty);
}


refreshCounterParty();
const table = () => divElement;
export {addCounterParty, refreshCounterParty, table};
export default table;