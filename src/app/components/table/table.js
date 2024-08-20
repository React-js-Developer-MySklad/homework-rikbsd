import html from './table.html';
import trash from './trash.html';
import './table.css';
import items from './item';

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

window.refreshCounterParty = function() {
    let counterParty = items;
    try {
        counterParty = JSON.parse(localStorage.getItem('counterParty'));
    } catch (ignore) {
    }

    if (counterParty == null || !Array.isArray(counterParty)) {
        counterParty = items;
        localStorage.setItem('counterParty', JSON.stringify(counterParty));
    }

    tBodyElement.innerHTML = "";
    for (const item of counterParty) {
        const newRow = createRowColumn(tBodyElement, templateRow, '');

        createRowColumn(newRow, templateRowCol, item.name);
        createRowColumn(newRow, templateRowCol, item.inn);
        createRowColumn(newRow, templateRowCol, item.kpp);
        createRowColumn(newRow, templateRowCol, item.address);
        createRowColumn(newRow, templateRowCol, trash);

        newRow.querySelector(".trash-button").addEventListener('click', (e) => {
            let counterParty = items;
            try {
                counterParty = JSON.parse(localStorage.getItem('counterParty'));
            } catch (ignore) {
            }

            if (counterParty == null || !Array.isArray(counterParty)) {
                counterParty = items;
            }

            counterParty = counterParty.filter(itm => itm.id != item.id);

            localStorage.setItem('counterParty', JSON.stringify(counterParty));

            refreshCounterParty();
        });
    }
}

refreshCounterParty();

export default () => divElement;