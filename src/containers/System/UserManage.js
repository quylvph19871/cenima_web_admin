import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userSevice'
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
            }
        } catch (error) {
            console.log(error);
        }

        console.log("check data", data);
    }

    handleDeleteUser = async (user) => {
        console.log('delete user', user);
        try {

            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact()
            } else {
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error);
        }
    }
    handleEditUser = (user) => {
        console.log('check data', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                this.getAllUsersFromReact()
            } else {
                alert(res.errCode)
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        let arrUsers = this.state.arrUsers;

        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFormParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />

                {this.state.isOpenModalEditUser && <ModalEditUser
                    isOpen={this.state.isOpenModalEditUser}
                    toggleFormParent={this.toggleUserEditModal}
                    currentUser={this.state.userEdit}
                    editUser={this.doEditUser}
                />}
                <div className="title text-center">Manage users with cenima</div>
                <div className="mx-5">
                    <button
                        onClick={() => this.handleAddNewUser()}
                        className='btn btn-primary px-3'>
                        <i className="fas fa-plus"></i>
                        Thêm người dùng</button>
                </div>
                <div className="users-table mt-3 mx-5">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>

                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleEditUser(item)} >
                                                <i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item)}>
                                                <i className="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>


                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
