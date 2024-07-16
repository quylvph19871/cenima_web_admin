import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions"
import './Login.scss';
import { handleLoginApi } from '../../services/userSevice';
import { FormattedMessage } from 'react-intl';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        };
    }

    // Hàm duy nhất để xử lý sự kiện thay đổi cho các input
    onUsernameChange = (e) => {
        this.setState({ username: e.target.value })
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log(error.response);
            // this.setState({
            //     errMessage: error.errMessage
            // })
        }
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className='login-background'>
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Đăng nhập</div>
                        <div className='col-12 form-group login-input'>
                            <label>Tài khoản*</label>

                            <div className='custom-input'>
                                <i class="far fa-user icon-left" ></i>
                                <div className='separating-bar'></div>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Nhập tên tài khoản'
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onUsernameChange}
                                />
                            </div>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Mật khẩu*</label>

                            <div className='custom-input'>
                                <i class="fas fa-unlock-alt icon-left"></i>
                                <div className='separating-bar'></div>
                                <input
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Nhập mật khẩu'
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onPasswordChange}
                                />
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i class={this.state.isShowPassword ? "far fa-eye icon-right" : "far fa-eye-slash icon-right"}></i>

                                </span>
                            </div>
                        </div>

                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <span className='forgot-password'>Quên mật khẩu?</span>
                        </div>

                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className='btn-login' onClick={this.handleLogin}>Đăng nhập</button>
                        </div>

                        <div className="col-12"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
