import React from "react";

const closeFromModal = jest.fn();
const addFromModal = jest.fn();

const mockModalMock = (props: {data: any, openModal: boolean, onAdd: (arg0: any) => void , onModalClose: () => void}) => {
    closeFromModal.mockImplementation(() => {
        props.onModalClose();
    });
    addFromModal.mockImplementation(() => {
        props.onAdd({'id': 'testId', 'name': 'testName'});
    });
    return <>
        {props.openModal ? <div>Modal opened</div> : <div>Modal closed</div>}
        <div>{'Modal edit mocked data is: ' + JSON.stringify(props.data)}</div>
    </>;
};

export {mockModalMock, closeFromModal, addFromModal};