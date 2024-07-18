import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            // passWord: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            gender: '0',
            roleId: '1'
        }

    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
            })
        }
        console.log('did mouting modal', this.props.currentUser);
    }

    toggle = () => {
        this.props.toggleFormParent()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })


    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'phoneNumber']
        for (let i = 0; i < arrInput.length; i++) {
            console.log('check loop', this.state[arrInput[i]], arrInput[i]);
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Tham số truyền vào: ' + arrInput[i])
                break;
            }

        }
        return isValid
    }
    handelEditUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            this.props.editUser(this.state)
        }


    }


    render() {
        console.log('check props from parent', this.props);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Sửa người dùng</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="Email"
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                                disabled
                            />
                        </div>

                        <div className="input-container">
                            <label>Tên</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Họ</label>
                            <input type="text"
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Số điện thoại</label>
                            <input type="number"
                                onChange={(event) => { this.handleOnChangeInput(event, "phoneNumber") }}
                                value={this.state.phoneNumber}
                            />
                        </div>
                        <div className="input-container">
                            <label>Giới tính</label>
                            <select name="gender"
                                onChange={(event) => { this.handleOnChangeInput(event, 'gender') }}
                                value={this.state.gender}
                            >
                                <option value="0">Không</option>
                                <option value="1">Nam</option>
                                <option value="2">Nữ</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Vai trò</label>
                            <select name="roleId"
                                disabled
                                onChange={(event) => { this.handleOnChangeInput(event, 'roleId') }}
                                value={this.state.roleId}>
                                <option value="1">Admin</option>
                                <option value="2">Enployee</option>
                                <option value="3">Customer</option>

                            </select>
                        </div>

                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => { this.handelEditUser() }}>
                        Sửa
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>
                        Thoát
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
