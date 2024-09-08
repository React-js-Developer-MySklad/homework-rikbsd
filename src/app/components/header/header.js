import html from './header.html';
import './header.css';

import {formClear} from '../modal/modal';

const element = document.createElement('div')
element.innerHTML = html;

element.querySelector('.header-button').addEventListener('click', (e) => {
    formClear();
});

export default () => element;