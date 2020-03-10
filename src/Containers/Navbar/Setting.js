import React, { useState } from "react";
import { connect } from "react-redux";
import { removeUserFromSession } from "../../Functions/AuthToken";
import {
  onUpdateSettingClicked,
  setLoading
} from "../../ReduxStore/Actions/eventActions";
import { logOutButtonClicked } from "../../ReduxStore/Actions/userActions";
import { SettingForm } from "../../Components/Navbar/SettingForm"
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

                    <SettingForm
                      image={image}
                      name={name}
                      bio={bio}
                      email={email}
                      passWord={passWord}
                      setImage={setImage}
                      setName={setName}
                      setBio={setBio}
                      setEmail={setEmail}
                      setPassWord={setPassWord}
                      setLoading={props.setLoading}
                      onUpdateSettingClicked={props.onUpdateSettingClicked}
                      logOutButtonClicked={props.logOutButtonClicked}
                      removeUserFromSession={removeUserFromSession}
                    />
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
