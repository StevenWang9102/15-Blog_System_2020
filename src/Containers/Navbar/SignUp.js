import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { onSignUpButtonClicked } from "../../ReduxStore/Actions/userActions";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export const InternalSignUp = props => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertText, setAlertText] = useState("");

  function ValidateEmail(mail) {
    // eslint-disable-next-line no-useless-escape
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
      ? false
      : true;
  }

  return (
    <div>
      {props.signUpStatus === "LOADED" ? (
        <Redirect to='/home' />
      ) : (
        <div className='auth-page'>
          <div className='container page'>
            <div className='row'>
              <div className='col-md-6 offset-md-3 col-xs-12'>
                <h1 className='text-xs-center'>Sign up</h1>
                <p className='text-xs-center'>
                  <a href='#top'>Have an account?</a>
                </p>

                <form>
                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='text'
                      onChange={event => setUserName(event.target.value)}
                      placeholder='Your Name'></input>
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='text'
                      onChange={event => setEmail(event.target.value)}
                      placeholder='Email'></input>
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='password'
                      onChange={event => setPassword(event.target.value)}
                      placeholder='Password'></input>
                  </fieldset>

                  <button
                    className='btn btn-lg btn-primary pull-xs-right'
                    type='button'
                    onClick={() => {
                      // Input validation
                      if (
                        userName.length === 0 ||
                        password.length === 0 ||
                        email.length === 0
                      )
                        setAlertText(
                          "Username, Password, Email can not be blank"
                        );
                      else if (userName.length > 20)
                        setAlertText(
                          "Username is too long (maximum is 20 characters)"
                        );
                      else if (password.length < 8)
                        setAlertText(
                          "Password is too short (minimum is 8 characters)"
                        );
                      else if (ValidateEmail(email))
                        setAlertText("Email is invalid");
                      else {
                        props.onSignUpButtonClicked(userName, email, password);
                        setAlertText("");
                      }
                    }}>
                    Sign up
                  </button>
                  <div className='sign_Alert'> {alertText} </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

InternalSignUp.propTypes = {
  signUpStatus: PropTypes.string,
  onSignUpButtonClicked: PropTypes.func
};

const mapStateToProps = ({ eventReducer }) => {
  const { signUpStatus } = eventReducer;

  return {
    signUpStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUpButtonClicked: (userName, email, password) =>
      dispatch(onSignUpButtonClicked(userName, email, password))
  };
};

export const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalSignUp);
