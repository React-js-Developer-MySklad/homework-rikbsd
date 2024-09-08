import html from './main.html';
import table from '../table/table';
import modal from "../modal/modal";

const element = document.createElement("div");
element.innerHTML = html;

element.querySelector('#table').append(table());
element.querySelector('#modal').append(modal());

export default () => element;