import 'flowbite';
import './style.css'

import {createRoot} from "react-dom/client";
import {App} from "./components/app/app";
import {StrictMode} from "react";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App/>
    </StrictMode>
);