import React, {useEffect, useRef, useState} from "react";
import {Form} from "react-final-form";

import {CounterPartyRecord} from '../../model/counter_party_record.type';

import './modal.css';
import cross from '../../assets/cross.svg';
import {ModalField} from "./field";


type iProps = {
    data: CounterPartyRecord|null,
    openModal: boolean,
    onAdd: (data: CounterPartyRecord) => void,
    onModalClose: () => void
}


export const AddModal: React.FC<iProps> = ({data, openModal, onAdd, onModalClose}) => {
    const [bCreate, setButtonCreate] = useState('Создать');
    const [initialValues, setInitialValues] = useState({});


    useEffect(() => {
        openModal && showModal(data);
    }, [openModal]);


    const showModal = function (data: CounterPartyRecord) {
        const modal = window.FlowbiteInstances.getInstance("Modal", "default-modal");
        modal.updateOnHide(onModalClose);

        setInitialValues(data !== null ? data : {});
        setButtonCreate(data !== null ? 'Сохранить' : 'Создать');

        modal.show();
    }


    const ffFormSubmit = (data: CounterPartyRecord) => {
        onAdd(data);

        setInitialValues({});
        window.FlowbiteInstances.getInstance("Modal", "default-modal").hide();
    };


    const ffFormValidate = (item: CounterPartyRecord) => {
        let result: any = {};
        if (!item.name || item.name.length < 1) {
            result.name = {message: 'Поле name должно быть задано.'};
        }
        if (!item.inn || item.inn.toString().length < 11 || !item.inn.toString().match(/^[\d]{11}$/)) {
            result.inn = {message: 'Поле inn должно быть задано и содержать в точности 11 цифр.'};
        }
        if (!item.kpp || item.kpp.toString().length < 9 || !item.kpp.toString().match(/^[\d]{9}$/)) {
            result.kpp = {message: 'Поле kpp должно быть задано и содержать в точности 9 цифр.'};
        }
        if (!item.address || item.address.toString().length < 1) {
            result.address = {message: 'Поле address должно быть задано.'};
        }

        return Object.getOwnPropertyNames(result).length !== 0 ? result : undefined;
    };


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
                            <Form<CounterPartyRecord> onSubmit={ffFormSubmit} validate={ffFormValidate} initialValues={initialValues}>
                                {props => (
                                    <form name="counterparty" id="counterparty" onSubmit={async event => {
                                            await props.handleSubmit(event);
                                            props.form.reset();
                                        }}>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Контрагент
                                        </h3>
                                        <div className="mt-4 w-full">
                                            <ModalField type={"text"} name={"name"} placeholder={"Вася Пупки и Ко"} label={"Name"}/>
                                            <ModalField type={"hidden"} name={"id"}/>
                                        </div>
                                        <div className="mt-4 w-full">
                                            <ModalField type={"text"} name={"inn"} placeholder={"12345678901"} label={"Inn"} pattern="^\d{11}$"/>
                                        </div>
                                        <div className="mt-4 w-full">
                                            <ModalField type={"text"} name={"kpp"} placeholder={"123456789"} label={"Kpp"} pattern="^\d{9}$"/>
                                        </div>
                                        <div className="mt-4 w-full">
                                            <ModalField type={"textarea"} name={"address"} label={"Address"} attrs={{minLength: 1, rows: 3}}/>
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
                                )}
                            </Form>
                        </div>
                        {/*// -- Modal footer --*/}
                    </div>
                </div>
            </div>
        </>
    );
}
