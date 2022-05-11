import React from 'react';
import {useNavigate} from "react-router-dom";

import s from './style.module.scss'
import Button from "../../components/Button/Button";

const NotFound = () => {
    const navigate = useNavigate()
    const navigateHandle = () => {
        navigate('/')
    }

    return (
        <div className={s.page}>
            <div className={s.title}>404</div>

            <p className={s.additionalTitle}>Page not found</p>
            <p className={s.descr}>Sorry, we could not find that page</p>

            <Button buttonText='Back to Main Page' onClick={navigateHandle}/>
        </div>
    );
};

export default NotFound;
