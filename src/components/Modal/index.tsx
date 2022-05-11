import React from 'react';
import s from './style.module.scss'
import cn from "classnames";

import Close from '../../assets/delete.png'

interface IModal {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    title?: string,
    children?: React.ReactNode
}

const Modal: React.FC<IModal> = ({
                                     active,
                                     setActive,
                                     title,
                                     children
                                 }) => {
    return (
        <div className={cn(s.modal, {[s.active]: active})}
             onClick={() => setActive(false)}>
            <div className={s.modal_content}
                 onClick={e => e.stopPropagation()}>

                <div className={s.modal_header}>
                    <h2>{title}</h2>
                    <span className={s.close}
                          onClick={() => setActive(false)}>
                        <img src={Close} alt=""/>
                    </span>
                </div>

                {children}
            </div>
        </div>
    );
};

export default Modal;
