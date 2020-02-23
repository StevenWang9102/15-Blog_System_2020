import React, { useState } from "react";
import { connect } from "react-redux";
import { removeUserFromSession } from "../../Components/UserComponent/AuthToken";
import { getUserInformation } from "../../ReduxStore/FeedDetails/feedSagas";
import {
  logOutButtonClicked,
  onUpdateSettingClicked
} from "../../ReduxStore/FeedDetails/feedActions";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

const InternalSetting = props => {
  const [image, setImage] = useState(getUserInformation().image);
  const [name, setName] = useState(getUserInformation().username);
  const [bio, setBio] = useState(getUserInformation().bio);
  const [email, setEmail] = useState(getUserInformation().email);

  return (
    <div>
      {props.yourSettingStatus === "updated" ?  <Redirect to="/home" />
       :  
       <div className='auth-page'>
            <div className='settings-page'>
              <div className='container page'>
                <div className='row'>
                  <div className='col-md-6 offset-md-3 col-xs-12'>
                    <h1 className='text-xs-center'>Your Settings</h1>

                    <form>
                      <fieldset>
                        <fieldset className='form-group'>
                          <input
                            className='form-control'
                            type='text'
                            onChange={event => setImage(event.target.value)}
                            value={image}
                            placeholder='URL of profile picture'></input>
                        </fieldset>

                        <fieldset className='form-group'>
                          <input
                            className='form-control form-control-lg'
                            type='text'
                            onChange={event => setName(event.target.value)}
                            value={name}
                            placeholder='Your Name'></input>
                        </fieldset>

                        <fieldset className='form-group'>
                          <textarea
                            className='form-control form-control-lg'
                            onChange={event => setBio(event.target.value)}
                            value={bio}
                            rows='8'
                            placeholder='Short bio about you'></textarea>
                        </fieldset>

                        <fieldset className='form-group'>
                          <input
                            className='form-control form-control-lg'
                            onChange={event => setEmail(event.target.value)}
                            value={email}
                            type='text'
                            placeholder='Email'></input>
                        </fieldset>

                        <fieldset className='form-group'>
                          <input
                            className='form-control form-control-lg'
                            type='password'
                            // nChange={event => setEmail(event.target.value)}
                            // value={email}
                            placeholder='Password'></input>
                        </fieldset>

                        <button
                          className='btn btn-lg btn-primary pull-xs-right'
                          type='button'
                          onClick={() =>
                            props.onUpdateSettingClicked({
                              image,
                              name,
                              bio,
                              email
                            })
                          }>
                          Update Settings
                        {/* 需要翻页
                            判据 - 更新了用户数据
                         每次还要重置这个状态。。。。。。。。。。。
                  */}
                        </button>

                        <hr className='hr-setting' />

                        <Link to='/home' className='logout-button'>
                          <button
                            type='button'
                            className='btn btn-lg btn-danger'
                            onClick={() => {
                              removeUserFromSession();
                              props.logOutButtonClicked("log_out");
                            }}>
                            click here to logout
                        </button>
                        </Link>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
    </div>
  );
};


const mapStateToProps = ({ yourSettingStatus }) => {
  return { yourSettingStatus };
};

const mapDispatchToProps = dispatch => {
  return {
    logOutButtonClicked: log => dispatch(logOutButtonClicked(log)),
    onUpdateSettingClicked: request => dispatch(onUpdateSettingClicked(request))
  };
};

export const Setting = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalSetting);
