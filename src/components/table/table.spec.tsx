import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react";

import {CounterPartyRecord} from "../../model/counter_party_record";
import {Table} from './table';
import items from './items';

import '../../lib/__mock__/local_storage_mock'
import {getStorageValue} from "../../lib/local_storage";

describe('Table', () => {
    afterEach(() => {
        localStorage.clear();
    });


    const setup = (data: CounterPartyRecord = {...items[0], id: ''}, exp: number = 1 + 3) => {
        // Настройка базовых параметров и проверка базового начального состояния
        const modalCallBack = jest.fn();
        const {rerender} = render(<Table data={null} modalCallBack={modalCallBack}/>);
        expect(screen.getAllByRole('row').length).toEqual(1 + 2);
        rerender(<Table data={data} modalCallBack={modalCallBack}/>);
        expect(screen.getAllByRole('row').length).toEqual(exp);

        return {data, modalCallBack, rerender};
    };


    it('Проверка добавления записей', () => {
        setup();
    });


    it('Проверка изменения записей', () => {
        const {data} = setup({...items[0], inn: 11111111111}, 1 + 2);
        expect(getStorageValue('items', '')[0].inn).toEqual(data.inn);
        expect(getStorageValue('items', '')[0].inn).not.toEqual(items[0].inn);
    });


    it('Проверка удаления записей', () => {
        setup();

        const secondRowId = getStorageValue('items', '')[1].inn;
        const delButtonElement = screen.getAllByRole('row')[3].getElementsByTagName('button')[0];
        fireEvent.click(delButtonElement);
        expect(screen.getAllByRole('row').length).toEqual(1 + 2);
        expect(getStorageValue('items', '').map((v: CounterPartyRecord) => v.id)).not.toContain(secondRowId);
    });


    it('Проверка запуска модального окна', () => {
        const {modalCallBack} = setup();

        fireEvent.click(screen.getAllByRole('row')[2]);
        expect(modalCallBack).toHaveBeenCalledTimes(1);
        expect(modalCallBack).toBeCalledWith(getStorageValue('items', '')[1]);

        fireEvent.click(screen.getAllByRole('row')[1]);
        expect(modalCallBack).toHaveBeenCalledTimes(2);
        expect(modalCallBack).toBeCalledWith(getStorageValue('items', '')[0]);
    });
});
