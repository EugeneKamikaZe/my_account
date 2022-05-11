import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthPage from "./pages/Auth";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {checkLogin} from "./store/reducers/CheckLogin/ActionCreator";

function App() {
    const dispatch = useAppDispatch()
    const {isLogin} = useAppSelector(state => state.loginReducer)

    useEffect(() => {
        dispatch(checkLogin())
    }, [])

    return (
        <>
            <Routes>
                <Route path='/' element={<AuthPage/>}/>

                {
                    isLogin && <Route path='home' element={<HomePage/>}/>
                }

                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <ToastContainer/>
        </>
    );
}

export default App;
