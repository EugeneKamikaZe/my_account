import React from 'react';
import s from "./style.module.scss";

import DeleteIcon from "../../assets/delete.png";
import ChangeIcon from "../../assets/change.png";
import {postAPI} from "../../services/PostService";

const User = () => {
    const {data: posts, isLoading, isError} = postAPI.useFetchAllUsersQuery(25)

    return (
        <div key={user.email}
             className={s.user}
        >
            <div className={s.text}>
                <p>{user.name}</p>
                <p className={s.colored}>{user.surname}</p>
            </div>

            <div className={s.edit}>
                <span className={s.edit_icon}
                      onClick={() => handleDelete(user)}>
                    <img src={DeleteIcon} alt=""/>
                </span>

                <span className={s.edit_icon}
                      onClick={() => {
                          setModalActive(!modalActive)
                          setModalTitle('Edit user')
                          setModalContent(UserTypes.edit)
                      }}>
                    <img src={ChangeIcon} alt=""/>
                </span>
            </div>
        </div>
    );
};

export default User;
