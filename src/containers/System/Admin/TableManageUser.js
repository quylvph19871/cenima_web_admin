import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions';
import UserRedux from './UserRedux';


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                usersRedux: this.props.users
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }
    handelEditUser = (user) => {
        this.props.handleEditUserFromPartent(user)
    }

    render() {

        let arrUsers = this.state.usersRedux
        return (
            <table id='TableManageUser'>
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>
                                        <button
                                            onClick={() => this.handelEditUser(item)}
                                            className='btn-edit'
                                        >
                                            <i className="fas fa-pencil-alt"></i></button>
                                        <button
                                            onClick={() => this.handleDeleteUser(item)}
                                            className='btn-delete'
                                        >
                                            <i className="far fa-trash-alt"></i></button>
                                    </td>
                                </tr>

                            )
                        })}



                </tbody>
            </table >
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
