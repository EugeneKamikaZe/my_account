import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchUsers} from "../../store/reducers/UsersFetch/ActionCreator";

import s from './style.module.scss'

import Button from "../../components/Button/Button";
import FormInput from "../../components/Input";
import {change} from "../../store/reducers/CheckLogin/LoginSlice";

const AuthPage: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {users} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const [isLoginError, setIsLoginError] = useState(false)
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

    const handleFormSubmit = () => {
        if (login.email.length === 0 || login.password.length === 0) {
            toast.warn('Need to fill all')
        } else {
            users.filter((val) => {
                if (val.email === login.email && val.pass === login.password) {
                    dispatch(change())
                    setIsLoginError(false)
                    navigate('/home')
                } else {
                    setIsLoginError(true)
                }
            })
        }

        isLoginError && toast.error('Invalid login or password')
    }

    return (
        <>
            <div className={s.authForm}>
                <h1 className={s.title}>Sign In</h1>

                <div className={s.form}>
                    <FormInput handleChange={handleInputChange}
                               id='email'
                               labelText='Email Address'
                               value={login.email}/>
                    <FormInput handleChange={handleInputChange}
                               type='password'
                               id='password'
                               labelText='Password'
                               value={login.password}/>

                    <Button buttonText='Submit'
                            type='submit'
                            className={s.confirmBtn}
                            onClick={handleFormSubmit}/>
                </div>
            </div>
        </>
    );
}

export default AuthPage;
