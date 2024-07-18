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

class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            passWord: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            gender: '0',
            roleId: '1'
        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', data => {
            this.setState({
                email: '',
                passWord: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                gender: '0',
                roleId: '1'
            })
        })
    }
    componentDidMount() {
        console.log('mouting modal');
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
        let arrInput = ['email', 'passWord', 'firstName', 'lastName', 'phoneNumber']
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
    handleAddNewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === true) {
            this.props.createNewUser(this.state)
        }


    }


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Thêm người dùng</ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="Email"
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Mật khẩu</label>
                            <input type="password"
                                onChange={(event) => { this.handleOnChangeInput(event, "passWord") }}
                                value={this.state.passWord}
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
                        <div className="input-container max-width-input">
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
                        onClick={() => { this.handleAddNewUser() }}>
                        Lưu
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
