import React, {useState} from "react";

import './app.css'
import {Header} from '../header/header'
import {Footer} from '../footer/footer'

export const App: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <header><Header onClick={() => {setShowModal(true);}}/></header>
            <main></main>
            <footer><Footer/></footer>
        </>
    );
};
