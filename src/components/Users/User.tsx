import React from 'react';
import {IUser} from "../../models/user";

import s from "./style.module.scss";

import DeleteIcon from "../../assets/delete.png";
import ChangeIcon from "../../assets/change.png";

export interface PostItemProps {
    post: IUser,
    onDelete: (post: IUser) => void,
    onEdit: (post: IUser) => void
}

const User: React.FC<PostItemProps> = ({post, onDelete, onEdit}) => {
    return (
        <div key={post.email}
             className={s.user}
             onClick={() => onEdit({...post})}>
            <div className={s.text}>
                <p>{post.name}</p>
                <p className={s.colored}>{post.surname}</p>
            </div>

            <div className={s.edit}>
                <span className={s.edit_icon}
                      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                          e.stopPropagation()
                          onDelete(post)
                      }}>
                    <img src={DeleteIcon} alt=""/>
                </span>

                <span className={s.edit_icon}
                      onClick={() => onEdit({...post})}>
                    <img src={ChangeIcon} alt=""/>
                </span>
            </div>
        </div>
    );
};

export default User;
