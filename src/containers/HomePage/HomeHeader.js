import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/images/logocenima.jpg'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/';
import { changeLanguageApp } from '../../store/actions/appActions.js';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        let language = this.props.language
        console.log('check language', language);
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img className="header-logo" src={logo} alt="" />

                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div className='subs-title'> <FormattedMessage id="homeheader.movie" /></div>

                            </div>
                            <div className="child-content">
                                <div className='subs-title'> Thống kê </div>

                            </div>
                            <div className="child-content">
                                <div className='subs-title'> Tài khoản</div>

                            </div>
                        </div>
                        <div className="right-content">

                            <div className={language === LANGUAGES.VI ? 'language-vn active' : 'language-vn'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>

                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title1">
                            Nền tảng đặt vé xem phim
                        </div>
                        <div className="title2">
                            Lựa chọn phim
                        </div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder='Tìm kiếm phim' />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon-img img1'>

                                    </div>

                                </div>
                                <div className="text-child">
                                    Quản lý phim
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon-img img2'>

                                    </div>
                                </div>
                                <div className="text-child">
                                    Doanh thu rạp
                                </div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon-img img3'>

                                    </div>
                                </div>
                                <div className="text-child">
                                    Doanh thu phim
                                </div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon-img img4'>

                                    </div>
                                </div>
                                <div className="text-child">
                                    Doanh thu nhân viên
                                </div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon-img img5'>

                                    </div>
                                </div>
                                <div className="text-child">
                                    Hóa đơn
                                </div>
                            </div>

                            <div className="option-child">
                                <div className="icon-child">
                                    <div className='icon-img img6'>

                                    </div>
                                </div>
                                <div className="text-child">
                                    Quản lý tài khoản
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
