import React, { useState } from "react";
import { connect } from "react-redux";
import { removeUserFromSession } from "../../Components/UserComponent/AuthToken";
import {
  onUpdateSettingClicked,
  setLoading
} from "../../ReduxStore/Actions/eventActions";
import { logOutButtonClicked } from "../../ReduxStore/Actions/userActions";

import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

const InternalSetting = props => {
  const [image, setImage] = useState(props.userInformation.image);
  const [name, setName] = useState(props.userInformation.username);
  const [bio, setBio] = useState(props.userInformation.bio);
  const [email, setEmail] = useState(props.userInformation.email);
  const [passWord, setPassWord] = useState("");

  return (
    <div>
      {props.settingStatus === "UPDATED" ? (
        <Redirect to='/home' />
      ) : (
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
                            onChange={event => setPassWord(event.target.value)}
                            value={passWord}
                            placeholder='Password'></input>
                        </fieldset>

                        <button
                          className='btn btn-lg btn-primary pull-xs-right'
                          type='button'
                          onClick={() => {
                            props.setLoading("LOADING")
                            props.onUpdateSettingClicked({
                              image,
                              name,
                              bio,
                              email,
                              passWord
                            })
                          }}>
                          Update Settings
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
        )}
    </div>
  );
};

const mapStateToProps = ({ eventReducer, userReducer }) => {

  const { userInformation } = userReducer;
  const { settingStatus } = eventReducer;

  return {
    settingStatus,
    userInformation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logOutButtonClicked: log => dispatch(logOutButtonClicked(log)),
    setLoading: (status) => dispatch(setLoading(status)),
    onUpdateSettingClicked: request => dispatch(onUpdateSettingClicked(request))
  };
};

export const Setting = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalSetting);
