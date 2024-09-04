import React, {FormEvent, useEffect, useRef, useState} from "react";

import {CounterPartyRecord} from '../../model/counter_party_record';

import './modal.css';
import cross from '../../assets/cross.svg';

type iProps = {
    data: CounterPartyRecord|null,
    openModal: boolean,
    onAdd: (data: CounterPartyRecord) => void,
    onModalClose: () => void
}


export const AddModal: React.FC<iProps> = ({data, openModal, onAdd, onModalClose}) => {
    const formEl = useRef(null);
    const [bCreate, setButtonCreate] = useState('Создать');


    useEffect(() => {
        if (openModal) {
            if (formEl.current.elements['id'].value !== '' && formEl.current.elements['id'].value !== null) {
                formEl.current.reset();
            }
            showModal(data);
        }
    }, [openModal]);


    const showModal = function (data: CounterPartyRecord) {
        const modal = window.FlowbiteInstances.getInstance("Modal", "default-modal");
        modal.updateOnHide(onModalClose);

        if (data !== null) {
            formEl.current.elements['id'].value = data.id;
            formEl.current.elements['name'].value = data.name;
            formEl.current.elements['inn'].value = data.inn;
            formEl.current.elements['kpp'].value = data.kpp;
            formEl.current.elements['address'].value = data.address;
            setButtonCreate('Сохранить');
        } else if (formEl.current.elements['id'].value !== '') {
            formEl.current.elements['id'].value = null;
            formEl.current.elements['name'].value = null;
            formEl.current.elements['inn'].value = null;
            formEl.current.elements['kpp'].value = null;
            formEl.current.elements['address'].value = null;
            setButtonCreate('Создать');
        }

        modal.show();
    }


    const onSubmit = function(event: FormEvent) {
        event.preventDefault();
        let data: CounterPartyRecord = {
            id: formEl.current.elements['id'].value,
            name: formEl.current.elements['name'].value,
            inn: +formEl.current.elements['inn'].value,
            kpp: +formEl.current.elements['kpp'].value,
            address: formEl.current.elements['address'].value
        };

        if (data.name.length === 0 ||
            formEl.current.elements['inn'].value.length !== 11 ||
            formEl.current.elements['kpp'].value.length !== 9 ||
            data.address.length < 1
        ) {
            event.stopPropagation();
            return false;
        }

        onAdd(data);

        window.FlowbiteInstances.getInstance("Modal", "default-modal").hide();
        formEl.current.reset();

        return false;
    }


    return (
        <>
            {/*// <!--Main modal -->*/}
            <div id="default-modal" tabIndex={-1} aria-hidden="true"
                 className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative px-4 py-4 max-w-2xl max-h-full">
                    {/*// -- Modal content --*/}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        {/*// -- Modal header --*/}
                        <div className="flex items-center justify-between md:px-5 md:pt-5 md:pb-0 rounded-t dark:border-gray-600">
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <img src={cross} className="w-3 h-3" aria-hidden="true"  alt={'close'}/>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/*// -- Modal body --*/}
                        <div className="p-4 md:p-5">
                            <form name="counterparty" id="counterparty" ref={formEl} onSubmit={onSubmit}>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Контрагент
                                </h3>
                                <div className="mt-4 w-full">
                                    <label htmlFor="name" className="modal-label">Name</label>
                                    <input type="text" id="name" className="modal-input" required
                                           placeholder="Вася Пупки и Ко"/>
                                    <input type="hidden" id="id" className="modal-input"/>
                                </div>
                                <div className="mt-4 w-full">
                                    <label htmlFor="inn" className="modal-label">Inn</label>
                                    <input type="text" id="inn" className="modal-input" required pattern="^\d{11}$"
                                           placeholder="12345678901"/>
                                </div>
                                <div className="mt-4 w-full">
                                    <label htmlFor="kpp" className="modal-label">Kpp</label>
                                    <input type="text" id="kpp" className="modal-input" required pattern="^\d{9}$"
                                           placeholder="123456789"/>
                                </div>
                                <div className="mt-4 w-full">
                                    <label htmlFor="address" className="modal-label">Address</label>
                                    <textarea rows={3} id="address" className="modal-input" required minLength={1}
                                              placeholder="12345678901"/>
                                </div>
                                <div className="flex items-center border-gray-200 rounded-b dark:border-gray-600 mt-10">
                                    <button type="submit" name="create" form="counterparty"
                                            className="w-1/2 mr-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        {bCreate}
                                    </button>
                                    <button data-modal-hide="default-modal" type="button" name="cancel"
                                            className="w-1/2 ml-2.5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Отмена
                                    </button>
                                </div>
                            </form>
                        </div>
                        {/*// -- Modal footer --*/}
                    </div>
                </div>
            </div>
        </>
    );
}
