import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUser} from "../../../models/user";

import axios from "axios";

export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async (_, thunkAPI) => {
        const response = await axios.get<IUser[]>('http://localhost:3009/users')
        return response.data
    }
)
