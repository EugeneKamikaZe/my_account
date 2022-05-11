import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import cn from "classnames";

export interface ButtonProps {
    buttonText: string,
    svg?: string | SVGAElement,
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    isDisabled?: boolean,
    type?: "button" | "submit" | "reset"
}

export enum ButtonType {
    primary = 'btn-primary',
    secondary = 'btn-secondary',
    link = 'btn-link',
}

const Button: React.FC<ButtonProps>
        = ({
               buttonText,
               svg,
               className = ButtonType.primary,
               onClick,
               isDisabled = false,
               type = 'button'
           }) => {
    return (
            <button
                    className={cn('btn', className, {['disabled']: isDisabled})}
                    type={type}
                    onClick={onClick}
            >
                {buttonText}
                {svg}
            </button>
    )
}

export default Button
