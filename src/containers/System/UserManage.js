import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers } from '../../services/userSevice'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }


    render() {
        console.log('check render', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <div className="title text-center">Manage users with cenima</div>
                <div className="users-table mt-3 mx-5">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>

                        {arrUsers && arrUsers.map((item, index) => {
                            console.log('check map', item, index);
                            return (
                                <tr className='divClass'>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>
                                        <button className='btn-edit'><i class="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'><i class="far fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            )
                        })}

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
