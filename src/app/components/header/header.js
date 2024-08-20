import html from './header.html';
import './header.css';

const element = document.createElement('div')
element.innerHTML = html;

element.querySelector('.header-button').addEventListener('click', (e) => {
    formClear();
});

export default () => element;