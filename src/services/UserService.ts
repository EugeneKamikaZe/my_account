import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IUser} from "../store/reducers/UsersFetch/UserSlice";

export const postAPI = createApi({
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
            providesTags: res => ['User']
        }),
        createUser: build.mutation<IUser, IUser>({
            query: (post) => ({
                url: `/users`,
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['User']
        }),
        editUser: build.mutation<IUser, IUser>({
            query: (post) => ({
                url: `/users/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: build.mutation<IUser, IUser>({
            query: (post) => ({
                url: `/users/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),
    })
})
