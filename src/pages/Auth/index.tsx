import React, {useState} from 'react';
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";

import SvgIcon from "../../components/SvgIcon";

import s from './style.module.scss'
import cn from "classnames";

import FormInput from "../../components/Form/Input";
import FormCheckBox from "../../components/Form/CheckBox";
import Button, {ButtonType} from "../../components/Button";
import Heading from "../../components/Typography/Heading";
import Form from "../../components/Form";
import CreateAcc from "./CreateAcc";
import ForgotPass from "./ForgotPass";

const AuthPage: React.FC = () => {
    const navigate = useNavigate()
    const [isForgotPass, setIsForgotPass] = useState(false)
    const [isCreateAcc, setIsCreateAcc] = useState(false)
    const [login, setLogin] = useState(() => {
        return {
            email: "",
            password: "",
        }
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleFormSubmit = (e: React.SyntheticEvent) => {
        navigate('/home')
    }

    return (
        <div className={s.page}>

            <div className={s.authForm}>
                <SvgIcon icon='logo' height={40} width={40}/>

                {
                    isCreateAcc &&
                    <CreateAcc handleLinkChange={() => {
                        setIsCreateAcc(false)
                        setIsForgotPass(false)
                    }}/>
                }

                {
                    isForgotPass &&
                    <ForgotPass handleLinkChange={() => {
                        setIsCreateAcc(false)
                        setIsForgotPass(false)
                    }}/>
                }

                {
                    !isCreateAcc && !isForgotPass &&
                    <>
                        <Heading headerText='Sign In to 1Ci Account' level={2} className={s.title}/>

                        <Form onSubmit={handleFormSubmit} className={s.form}>
                            <FormInput handleChange={handleInputChange}
                                       id='email'
                                       labelText='Email Address'
                                       value={login.email}/>
                            <FormInput handleChange={handleInputChange}
                                       type='password'
                                       id='password'
                                       labelText='Password'
                                       value={login.password}/>

                            <FormCheckBox text='Remember me' name='remember' className={s.formCheckbox}/>

                            <Button buttonText='Sign In'
                                    type='submit'
                                    className={cn(ButtonType.primary, s.confirmBtn)}/>
                        </Form>

                        <Button onClick={(e) => {
                            e.preventDefault()
                            setIsForgotPass(true)
                        }}
                                buttonText="Forgot password?"
                                className={cn(ButtonType.link, 'mt-8')}/>

                        <p className={s.ttt}>Don't have an account? &nbsp;
                            <Button onClick={(e) => {
                                e.preventDefault()
                                setIsCreateAcc(true)
                            }}
                                    buttonText="Create one"
                                    className={ButtonType.link}/>
                        </p>
                    </>
                }
            </div>

            <div className={s.footer}>
                <div className={s.copy}>© 2022 1C International</div>
                <ul className={s.list}>
                    <li className={s.listItem}>
                        <a className={s.listItem_link} href="/information/privacy_policy/">Privacy
                            Policy</a>
                    </li>
                    <li className={s.listItem}>
                        <a className={s.listItem_link} href="/information/cookie_policy/">Cookie
                            Policy</a>
                    </li>
                    <li className={s.listItem}>
                        <a className={s.listItem_link} href="/information/terms_of_use/">Terms of
                            Use</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
;

export default AuthPage;
