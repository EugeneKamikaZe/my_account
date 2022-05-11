import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IUser} from "../models/user";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3009'}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        fetchAllUsers: build.query<IUser[], number>({
            query: (limit: number = 10) => ({
                url: `/users`,
                params: {
                    _limit: limit
                }
            }),
            providesTags: ['User']
        }),
        createUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: `/users`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        editUser: build.mutation<IUser, IUser>({
            query: ({id, ...user}) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: build.mutation<IUser, IUser>({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),
    })
})
