import React, {ChangeEventHandler} from 'react';
import s from "./style.module.scss";

interface IFormInput {
    id: string,
    labelText: string,
    value: string,
    type?: string,
    handleChange: ChangeEventHandler<HTMLElement>,
}

const FormInput: React.FC<IFormInput> = ({
                                             id,
                                             labelText,
                                             type = 'text',
                                             value,
                                             handleChange,
                                         }) => {
    return (
        <div className={s.formInput}>
            <label htmlFor={id}
                   className={s.formInput_label}
            >
                {labelText}
            </label>
            <input type={type}
                   id={id}
                   name={id}
                   value={value}
                   onChange={handleChange}
                   className={s.formInput_input}
            />
        </div>
    );
};

export default FormInput;
