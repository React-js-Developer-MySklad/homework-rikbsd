import React from "react";
import {Field} from "react-final-form";

type iProps = {
    type: string,
    name: string,
    placeholder?: string,
    label?: string,
    pattern?: string,
    attrs?: any
};


export const ModalField: React.FC<iProps> = ({type, name, placeholder, label, pattern, attrs}) => {
    return (
        <Field name={name}>
            {props => {
                return (
                    <>
                        {label && <label htmlFor={name} className="modal-label">{label}</label>}
                        {type == 'textarea' ?
                            <textarea {...props.input} id={name} className="modal-input" required placeholder={placeholder} {...attrs}/>
                            :
                            <input {...props.input} type={type} id={name} className="modal-input" required placeholder={placeholder} pattern={pattern} {...attrs}/>
                        }
                        {props.meta.error && <span>{props.meta.error.message}</span>}
                    </>
                );
            }}
        </Field>
    );
};