import React, {useState} from 'react';
import {toast} from "react-toastify";
import {userAPI} from "../../services/UserService";
import {IUser} from "../../models/user";

import s from './style.module.scss'
import Button from "../../components/Button/Button";

import Modal from "../../components/Modal";
import FormInput from "../../components/Input";
import Users from "../../components/Users";

const HomePage: React.FC<IUser> = () => {
    enum UserTypes {
        edit = 'EDIT_USER',
        add = 'ADD_USER',
        delete = 'DELETE'
    }

    const [modalActive, setModalActive] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [currentUser, setCurrentUser] = useState<IUser>()

    const [newUser, setNewUser] = useState(() => {
        return {
            name: "",
            surname: "",
            email: "",
            password: "",
        }
    })

    const [createUser, {}] = userAPI.useCreateUserMutation()
    const [deleteUser] = userAPI.useDeleteUserMutation()
    const [editUser] = userAPI.useEditUserMutation()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleModalOpen = (type: string, post?: IUser) => {
        setModalActive(!modalActive)
        switch (type) {
            case UserTypes.add:
                setModalTitle('New user')
                break
            case UserTypes.edit:
                setModalTitle('Edit user')
                setCurrentUser(post)
                break
            case UserTypes.delete:
                setModalTitle('Delete user?')
                setCurrentUser(post)
                break
        }
    }

    const handleUserAdd = async () => {
        if (newUser.name.length !== 0 && newUser.surname.length !== 0 && newUser.email.length !== 0 && newUser.password.length !== 0) {
            await createUser({
                name: newUser.name,
                surname: newUser.surname,
                email: newUser.email,
                pass: newUser.password
            } as IUser)
            setModalActive(false)
            toast.success(`User ${newUser.name} Added`)
        } else {
            toast.warn('Need to fill all')
        }
    }

    const handleUserDelete = () => {
        if (currentUser) {
            deleteUser(currentUser)
            setModalActive(false)
            toast.info(`User ${currentUser.name} Deleted`)
        }
    }

    const handleUserEdit = async (id: number | undefined, name:string, surname:string, email: string, pass: string | number) => {
        const updatedUser = {
            id, name, surname, email, pass
        }
        await editUser(updatedUser)
        setModalActive(false)
        toast.success(`User ${currentUser && currentUser.name} updated`)
        // TODO Empty string
    }

    return (
        <div className={s.page}>
            <Users onSubmit={() => handleModalOpen(UserTypes.add)}
                   onDelete={(post) => handleModalOpen(UserTypes.delete, post)}
                   onEdit={(post) => handleModalOpen(UserTypes.edit, post)}/>

            <Modal active={modalActive}
                   setActive={setModalActive}
                   title={modalTitle}>
                {
                    modalTitle === 'Delete user?'
                        ? <Button buttonText='Submit'
                                  type='submit'
                                  className={s.form_submit}
                                  onClick={handleUserDelete}
                        />
                        : <div className={s.form}>
                            <FormInput handleChange={handleInputChange}
                                       id='name'
                                       labelText='Name'
                                       value={newUser.name}/>
                            <FormInput handleChange={handleInputChange}
                                       id='surname'
                                       labelText='Surname'
                                       value={newUser.surname}/>
                            <FormInput handleChange={handleInputChange}
                                       id='email'
                                       labelText='Email'
                                       value={newUser.email}/>
                            <FormInput handleChange={handleInputChange}
                                       type='password'
                                       id='password'
                                       labelText='Password'
                                       value={newUser.password}/>
                            <Button buttonText='Submit'
                                    type='submit'
                                    className={s.form_submit}
                                    onClick={() => {
                                        modalTitle === 'New user' && handleUserAdd()
                                        modalTitle === 'Edit user' && handleUserEdit(currentUser && currentUser.id, newUser.name, newUser.surname, newUser.password, newUser.email)
                                    }}/>
                        </div>
                }
            </Modal>
        </div>
    )
}

export default HomePage;
