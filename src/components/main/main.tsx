import {Table} from '../table/table';
import {AddModal} from "../modal/modal";
import React, {useEffect, useState} from "react";
import {CounterPartyRecord} from "../../model/counter_party_record";

type iProps = {
    showModal: boolean
    onModalClose: () => void;
}

export const Main: React.FC<iProps> = ({showModal, onModalClose}) => {
    const [newData, setNewData] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [modalState, setModalState] = useState(showModal);

    useEffect(() => {
        setModalState(showModal);
    },[showModal]);

    const onMyModalClose = () => {
        setModalState(false);
        onModalClose();
        setModalData(null);
    };

    const modalCallBack = (data: CounterPartyRecord) => {
        setModalData(data);
        setModalState(true);
    }

    return (<>
        <div id="table"><Table data={newData} modalCallBack={modalCallBack}/></div>
        <div id="modal"><AddModal data={modalData} onAdd={setNewData} openModal={modalState} onModalClose={() => onMyModalClose()}/></div>
    </>);
}
