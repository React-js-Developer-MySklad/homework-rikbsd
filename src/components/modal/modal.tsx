import React from "react";

import {CounterPartyRecord} from '../../model/counter_party_record';

type iProps = {
    data: CounterPartyRecord|null,
    openModal: boolean,
    onAdd: (data: CounterPartyRecord) => void,
    onModalClose: () => void
}


export const AddModal: React.FC<iProps> = ({data, openModal, onAdd, onModalClose}) => {

    return (
        <>
        </>
    );
}
