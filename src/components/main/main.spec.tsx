import React from 'react';
import '@testing-library/jest-dom'
import {render, screen, prettyDOM, act} from "@testing-library/react";
import {Main} from './main';

const modalFromTable = jest.fn();
const closeFromModal = jest.fn();
const addFromModal = jest.fn();

jest.mock('../table/table', () => ({
    Table: (props: {data: any, modalCallBack: (arg0: any) => void}) => {
        modalFromTable.mockImplementation(() => {
            props.modalCallBack({'id': 'testId', 'name': 'testName'});
        });
        return <>
            <div>{'Table add mocked data is: ' + JSON.stringify(props.data)}</div>
        </>;
    },
}));
jest.mock('../modal/modal', () => ({
    AddModal: (props: {data: any, openModal: boolean, onAdd: (arg0: any) => void , onModalClose: () => void}) => {
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
    },
}));


afterEach(() => {
    jest.clearAllMocks();
});


describe('Main', () => {
    it('by default model closed', async() => {
        const onModalClose = jest.fn();
        render(<Main showModal={false} onModalClose={onModalClose}/>);
        expect(await screen.findByText('Modal closed', {exact: false}, {timeout: 1200})).toBeInTheDocument();
    });
    it('on "show modal" trigger from App to open modal', async() => {
        const onModalClose = jest.fn();
        render(<Main showModal={true} onModalClose={onModalClose}/>);
        expect(await screen.findByText('Modal opened', {exact: false}, {timeout: 1200})).toBeInTheDocument();
        act(() => {
            closeFromModal();
        });
        expect(await screen.findByText('Modal closed', {exact: false}, {timeout: 1200})).toBeInTheDocument();
    });
    it('on "submit add" trigger table\'s add', async() => {
        const onModalClose = jest.fn();
        render(<Main showModal={true} onModalClose={onModalClose}/>);
        expect(await screen.findByText('Table add mocked data is: null', {exact: false}, {timeout: 1200})).toBeInTheDocument();
        act(() => {
            addFromModal();
        });
        expect(await screen.findByText('Table add mocked data is: {"id":"testId","name":"testName"}', {exact: false}, {timeout: 1200})).toBeInTheDocument();
    });
    it('on "edit modal from table" trigger modal', async() => {
        const onModalClose = jest.fn();
        render(<Main showModal={true} onModalClose={onModalClose}/>);
        expect(await screen.findByText('Modal edit mocked data is: null', {exact: false}, {timeout: 1200})).toBeInTheDocument();
        act(() => {
            modalFromTable();
        });
        expect(await screen.findByText('Modal edit mocked data is: {"id":"testId","name":"testName"}', {exact: false}, {timeout: 1200})).toBeInTheDocument();
    });
});

