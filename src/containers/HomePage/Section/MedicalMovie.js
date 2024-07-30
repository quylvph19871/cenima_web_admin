import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './MedicalMovie.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class MedicalMovie extends Component {


    render() {

        return (
            <div className='section-movie'>
                <div className="movie-container">
                    <div className="movie-header">
                        <span className='title-section'>Danh sách phim nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className="movie-body">
                        <Slider {...this.props.settings}>

                            <div className="movie-customize">
                                <div className="bg-image">

                                </div>
                                <div>Milion</div>
                            </div>
                            <div className="movie-customize">
                                <div className="bg-image">

                                </div>
                                <div>Milion</div>
                            </div>
                            <div className="movie-customize">
                                <div className="bg-image">

                                </div>
                                <div>Milion</div>
                            </div>
                            <div className="movie-customize">
                                <div className="bg-image">

                                </div>
                                <div>Milion</div>
                            </div>
                            <div className="movie-customize">
                                <div className="bg-image">

                                </div>
                                <div>Milion</div>
                            </div>
                            <div className="movie-customize">
                                <div className="bg-image">

                                </div>
                                <div>Milion</div>
                            </div>
                            <div className="movie-customize">
                                <div className="bg-image">

                                </div>
                                <div>Milion</div>
                            </div>
                            <div className="movie-customize">
                                <div className="bg-image">

                                </div>
                                <div>Milion</div>
                            </div>

                        </Slider>
                    </div>

                </div>
            </div>

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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalMovie);
