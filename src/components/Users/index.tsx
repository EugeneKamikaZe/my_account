import React from 'react';
import s from "./style.module.scss";

import {userAPI} from "../../services/UserService";

import Button from "../Button/Button";
import User from "./User";
import {IUser} from "../../models/user";

interface UsersProps {
    onSubmit: (event: React.MouseEvent<HTMLElement>) => void
    onDelete: (post: IUser) => void,
    onEdit: (post: IUser) => void
}

const Users: React.FC<UsersProps> = ({onSubmit, onDelete, onEdit}) => {
    const {data: posts, isLoading, isError} = userAPI.useFetchAllUsersQuery(25)

    return (
        <>
            {
                isLoading && <h1>Loading ...</h1>
            }

            {
                isError && <h1>{isError}</h1>
            }

            {
                posts && <>
                    {/*<div className={s.search}>*/}
                    {/*    <input type="search"*/}
                    {/*           placeholder='search'*/}
                    {/*           id="site-search"*/}
                    {/*           name="q"*/}
                    {/*           className={s.search_input}/>*/}

                    {/*    <Button buttonText='Search'*/}
                    {/*            className={s.search_btn}/>*/}
                    {/*</div>*/}
                    {/*TODO Filter*/}

                    {
                        posts.map(user => (
                            <User post={user}
                                  onDelete={onDelete}
                                  onEdit={onEdit}
                                  key={user.email}/>
                        ))
                    }

                    <Button buttonText='Add New User'
                            className={s.addBtn}
                            onClick={onSubmit}/>
                </>
            }
        </>
    )
}

export default Users;
