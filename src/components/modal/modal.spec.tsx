import React, {act} from 'react';
import {render, screen, fireEvent} from "@testing-library/react";
import {AddModal} from './modal';
import {CounterPartyRecord} from "../../model/counter_party_record.type";
import {userEvent} from "@testing-library/user-event";

const FlowbiteMock = (function () {
    let store: {[key: string]: any} = {};

    return {
        getInstance(component: string, name: string) {
            if (store[component] === undefined) {
                store[component] = [];
            }
            if (store[component][name] === undefined) {
                store[component][name] = {
                    updateOnHide: (f: () => void) =>
                    {
                        this.updateOnHideCB = f;
                    },
                    hide: () =>
                    {
                        if (this.updateOnHideCB !== undefined) {
                            this.updateOnHideCB();
                        }
                    },
                    show: () => {}
                };
            }

            return store[component][name];
        },

        clear() {
            store = {};
        },
    };
})();

Object.defineProperty(window, "FlowbiteInstances", { value: FlowbiteMock });

describe('AddModal', () => {
    const refData: CounterPartyRecord = {id: '2bb52322-b070-4463-a16c-ede444651ad0', name: 'Рога и копыта', inn: "12345678901", kpp: "123456789", address: 'Огородный проезд, 10'} as unknown as CounterPartyRecord;
    afterEach(() => {
        FlowbiteMock.clear();
    });


    const setup = (data: CounterPartyRecord, button: string = 'Сохранить') => {
        const onAdd = jest.fn();
        const onModalClose = jest.fn();

        render(<AddModal data={data} onAdd={onAdd} openModal={true} onModalClose={onModalClose}/>);

        const buttonElement = screen.getByText(button);
        act(() => fireEvent.click(buttonElement));
        expect(onAdd).toHaveBeenCalledTimes(0);

        const user = userEvent.setup();

        return {onAdd, onModalClose, buttonElement, user}
    }


    it('Проверка работы с полем name', async() => {
        const {onAdd, buttonElement, user} = setup({...refData, name: ''});

        const element = screen.getByLabelText('Name')
        await act(async() => {
            await user.click(element);
            await user.keyboard('SomeName');
            fireEvent.click(buttonElement)
        });
        expect(onAdd).toHaveBeenCalledTimes(1);
        expect(onAdd).toBeCalledWith({...refData, name: 'SomeName'});
    });


    it('Проверка допустимых значений inn', async() => {
        const {onAdd, buttonElement, user} = setup({...refData, inn: 1234567890});

        const element = screen.getByLabelText('Inn')
        await act(async() => {
            await user.click(element);
            await user.keyboard('S');
            fireEvent.click(buttonElement);
        });
        expect(onAdd).toHaveBeenCalledTimes(0);
        await act(async() => {
            await user.keyboard('{Backspace}1');
            fireEvent.click(buttonElement);
        });
        expect(onAdd).toHaveBeenCalledTimes(1);
        expect(onAdd).toBeCalledWith(refData);
    });


    it('Проверка допустимых значений kpp', async() => {
        const {onAdd, buttonElement, user} = setup({...refData, kpp: 12345678});

        const element = screen.getByLabelText('Kpp')
        await act(async() => {
            await user.click(element);
            await user.keyboard('S');
            fireEvent.click(buttonElement);
        });
        expect(onAdd).toHaveBeenCalledTimes(0);
        await act(async() => {
            await user.keyboard('{Backspace}9');
            fireEvent.click(buttonElement);
        });
        expect(onAdd).toHaveBeenCalledTimes(1);
        expect(onAdd).toBeCalledWith(refData);
    });


    it('Проверка допустимого значения address', async() => {
        const {onAdd, buttonElement, user} = setup({...refData, address: ''});

        const element = screen.getByLabelText('Address')
        await act(async() => {
            await user.click(element);
            await user.keyboard('Some Addr');
            fireEvent.click(buttonElement);
        });
        expect(onAdd).toHaveBeenCalledTimes(1);
        expect(onAdd).toBeCalledWith({...refData, address: 'Some Addr'});
    });


    it('Проверка на id', async() => {
        const {onAdd, onModalClose, buttonElement, user} = setup(null, 'Создать');

        for (const value of ['Name', 'Inn', 'Kpp', 'Address']) {
            // Начинаем с того что проверяем состояние от предыдущего шага, начиная с ничего не введено.
            await act(async() => {
                fireEvent.click(buttonElement);
            });
            expect(onAdd).toHaveBeenCalledTimes(0);
            await act(async() => {
                await user.click(screen.getByLabelText(value));
                await user.keyboard((refData as any)[value.toLocaleLowerCase()].toString());
            });
        }
        await act(async() => {
            fireEvent.click(buttonElement);
        });
        expect(onAdd).toHaveBeenCalledTimes(1);
        expect(onAdd).toBeCalledWith({...refData, id: undefined});
        // Так же проверяем что после успешного завершения закроется мадалка.
        expect(onModalClose).toHaveBeenCalledTimes(1);
    });


    it.skip('Проверка индикации закрытия модалки (на моканом flowbite бесполезная)', () => {
        const onAdd = jest.fn();
        const onModalClose = jest.fn();
        render(<AddModal data={null} onAdd={onAdd} openModal={true} onModalClose={onModalClose}/>);
        const buttonElement = screen.getByText('Отмена');
        fireEvent.click(buttonElement);
        expect(onAdd).toHaveBeenCalledTimes(0);
        expect(onModalClose).toHaveBeenCalledTimes(1);
    });
});

