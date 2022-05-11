import React from 'react';
import SvgIcon from "../../components/SvgIcon";
import s from './style.module.scss'
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";
import {LinkEnum} from "../../routes";

const NotFound = () => {
    const navigate = useNavigate()
    const navigateHandle = () => {
        navigate(LinkEnum.HOME)
    }

    return (
        <div className={s.page}>
            <div className={s.icon_wrapper}>
                4<SvgIcon svgClassName={s.icon} icon={404}/>4
            </div>

            <p className={s.title}>Page not found</p>
            <p className={s.descr}>Sorry, we could not find that page</p>

            <Button buttonText='Back to Main Page' onClick={navigateHandle}/>
        </div>
    );
};

export default NotFound;
