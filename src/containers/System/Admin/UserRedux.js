import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import * as actions from '../../../store/actions';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],

            email: '',
            firstName: '',
            lastName: '',
            passWord: '',
            gender: '',
            phoneNumber: '',
            roleId: '',

            action: '',
            userEditId: ''
        }
    }
    state = {
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getRoleStart()
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux

            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })

        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })

        }

        if (prevProps.users !== this.props.users) {
            let arrGenders = this.props.genderRedux
            let arrRoles = this.props.roleRedux;
            this.setState({
                email: '',
                firstName: '',
                lastName: '',
                passWord: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                phoneNumber: '',
                roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let action = this.state.action;

        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUserStart({
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                passWord: this.state.passWord,
                gender: this.state.gender,
                phoneNumber: this.state.phoneNumber,
                roleId: this.state.roleId,
            })
        }

        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUserStart({
                id: this.state.userEditId,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                passWord: this.state.passWord,
                gender: this.state.gender,
                phoneNumber: this.state.phoneNumber,
                roleId: this.state.roleId,

            })
        }


    }

    handleEditUserFromPartent = (user) => {
        console.log(user);
        this.setState({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            passWord: '000000',
            gender: user.gender,
            phoneNumber: user.phoneNumber,
            roleId: user.roleId,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'firstName', 'lastName', 'passWord', 'phoneNumber',
        ]

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break
            }
        }
        return isValid

    }
    onchangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })

    }

    render() {
        let genders = this.state.genderArr
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender
        let { email, firstName, lastName, passWord, gender, phoneNumber,
            roleId, } = this.state

        return (
            <div className='user-redux-container'>
                <div className="title">
                    <FormattedMessage id="manage-user.add" />
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className="row mx-5 mt-3">
                            <div className='col-8'>{isLoadingGender === true ? 'Loading gender' : ''}</div>

                            <div className="col-8">
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input type="email"
                                    className='form-control'
                                    value={email}
                                    onChange={(e) => { this.onchangeInput(e, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input type="password"
                                    className='form-control'
                                    value={passWord}
                                    onChange={(e) => { this.onchangeInput(e, 'passWord') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input type="text"
                                    className='form-control'
                                    value={firstName}
                                    onChange={(e) => { this.onchangeInput(e, 'firstName') }} />
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input type="text"
                                    className='form-control'
                                    value={lastName}
                                    onChange={(e) => { this.onchangeInput(e, 'lastName') }} />
                            </div>
                            <div className="col-4">
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input type="number"
                                    className='form-control'
                                    value={phoneNumber}
                                    onChange={(e) => { this.onchangeInput(e, 'phoneNumber') }} />
                            </div>
                            <div className="col-6">
                                <label ><FormattedMessage id="manage-user.gender" /></label>
                                <select value={gender} id="inputState" className="form-control" onChange={(e) => { this.onchangeInput(e, 'gender') }}>
                                    {
                                        genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-6">
                                <label ><FormattedMessage id="manage-user.role" /></label>
                                <select id="inputState"
                                    value={roleId}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    className="form-control"
                                    onChange={(e) => { this.onchangeInput(e, 'roleId') }}>
                                    {
                                        roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className="col-12">
                                <button onClick={() => this.handleSaveUser()}
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}>
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="col-8 mb-5" >
                        <TableManageUser handleEditUserFromPartent={this.handleEditUserFromPartent}
                            action={this.state.action} />

                    </div>
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUserStart: (data) => dispatch(actions.createNewUserStart(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserStart: (data) => dispatch(actions.editUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
