import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removeUserFromSession } from "../../ReduxStore/AuthToken";
import { logOutButtonClicked } from "../../ReduxStore/Actions/userActions";
import { getUserFromSession } from "../../ReduxStore/AuthToken";
import {
  onUpdateSettingClicked,
} from "../../ReduxStore/Actions/eventActions";
import { userInformationLoaded } from "../../ReduxStore/Actions/userActions";

const InternalSetting = props => {

  const getUserInformationLocal = () => {
    // if we have userInformation on redux store, then get it from there first
    if (
      !props.userInformation ||
      (props.userInformation && !props.userInformation.token)
    ) {
      const userInformationOnSession = getUserFromSession();
      if (userInformationOnSession) {
        props.userInformationLoaded({ user: userInformationOnSession });
      }
      return userInformationOnSession;
    } else {
      return props.userInformation;
    }
  };

  const localUser = getUserInformationLocal();

  const [image, setImage] = useState(localUser.image);
  const [name, setName] = useState(localUser.username);
  const [bio, setBio] = useState(localUser.bio);
  const [email, setEmail] = useState(localUser.email);
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
                        props.onUpdateSettingClicked({
                          image,
                          name,
                          bio,
                          email,
                          passWord
                        });
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
                          logOutButtonClicked();
                        }}>
                        click here to logout
                      </button>
                    </Link>
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

InternalSetting.propTypes = {
  settingStatus: PropTypes.string.isRequired,
  userInformation: PropTypes.object
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
    logOutButtonClicked: () => dispatch(logOutButtonClicked()),
    userInformationLoaded: user => dispatch(userInformationLoaded(user)),
    onUpdateSettingClicked: request => dispatch(onUpdateSettingClicked(request))
  };
};

export const Setting = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalSetting);
