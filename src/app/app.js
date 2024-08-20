import html from "./app.html";
import './app.css'
import header from './components/header/header'
import footer from './components/footer/footer'
import main from './components/main/main'

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

const headerElement = document.getElementsByTagName('header').item(0);
headerElement.append(header());

const footerElement = document.getElementsByTagName('footer').item(0);
footerElement.innerHTML = footer();

const mainElement = document.getElementsByTagName('main').item(0);
mainElement.append(main());


