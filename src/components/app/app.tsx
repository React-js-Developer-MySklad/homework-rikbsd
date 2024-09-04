import React, {useState} from "react";

import './app.css'
import {Header} from '../header/header'
import {Footer} from '../footer/footer'
import {Main} from '../main/main'

export const App: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <header><Header onClick={() => {setShowModal(true);}}/></header>
            <main><Main showModal={showModal} onModalClose={() => {setShowModal(false);}}/></main>
            <footer><Footer/></footer>
        </>
    );
};
