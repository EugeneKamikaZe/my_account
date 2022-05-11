import {createSlice} from "@reduxjs/toolkit";

interface LoginState {
    isLogin: boolean,
}

const initialState: LoginState = {
    isLogin: false,
}

export const loginSlice = createSlice({
    name: 'isLogin',
    initialState,
    reducers: {
        change: (state) => {
          state.isLogin = true
        }
    },
})

export const {change} = loginSlice.actions
export default loginSlice.reducer
