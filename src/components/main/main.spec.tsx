import React from 'react';
import '@testing-library/jest-dom'
import {render, screen, act} from "@testing-library/react";
import {Main} from './main';

const tableMock = require('./__mocks__/table.mock');
const modalMock = require('./__mocks__/modal.mock');

jest.mock('../table/table', () => ({Table: (props: any) => (tableMock.mockTableMock(props))}));
jest.mock('../modal/modal', () => ({AddModal: (props: any) => (modalMock.mockModalMock(props))}));


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
            modalMock.closeFromModal();
        });
        expect(await screen.findByText('Modal closed', {exact: false}, {timeout: 1200})).toBeInTheDocument();
    });
    it('on "submit add" trigger table\'s add', async() => {
        const onModalClose = jest.fn();
        render(<Main showModal={true} onModalClose={onModalClose}/>);
        expect(await screen.findByText('Table add mocked data is: null', {exact: false}, {timeout: 1200})).toBeInTheDocument();
        act(() => {
            modalMock.addFromModal();
        });
        expect(await screen.findByText('Table add mocked data is: {"id":"testId","name":"testName"}', {exact: false}, {timeout: 1200})).toBeInTheDocument();
    });
    it('on "edit modal from table" trigger modal', async() => {
        const onModalClose = jest.fn();
        render(<Main showModal={true} onModalClose={onModalClose}/>);
        expect(await screen.findByText('Modal edit mocked data is: null', {exact: false}, {timeout: 1200})).toBeInTheDocument();
        act(() => {
            tableMock.modalFromTable();
        });
        expect(await screen.findByText('Modal edit mocked data is: {"id":"testId","name":"testName"}', {exact: false}, {timeout: 1200})).toBeInTheDocument();
    });
});

