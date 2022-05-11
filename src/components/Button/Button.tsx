import React from 'react';
import cn from "classnames";
import s from './style.module.scss'

export interface ButtonProps {
    buttonText: string,
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    type?: "button" | "submit"
}

const Button: React.FC<ButtonProps>
        = ({
               buttonText,
               className,
               onClick,
               type = 'button'
           }) => {
    return (
            <button className={cn(s.btn, className)}
                    type={type}
                    onClick={onClick}
            >
                {buttonText}
            </button>
    )
}

export default Button
