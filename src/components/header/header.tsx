import React from "react";
import './header.css';
import header_logo from '../../assets/header-logo.svg';
import file_check from "../../assets/file-check.svg";

type iProps = {
    onClick: (event: React.MouseEvent) => void
}

export const Header: React.FC<iProps> = ({onClick}) => {
    return (<>
        <img src={header_logo} className="logo"/>
        <button type="button" data-modal-target="default-modal" className="header-button" onClick={onClick}>
            <img src={file_check} className="w-4 h-4 me-2 text-gray-800 dark:text-white" aria-hidden="true"/>
            Добавить
        </button>
    </>);
}
