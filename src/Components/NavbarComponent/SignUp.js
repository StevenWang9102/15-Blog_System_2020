import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { onSignUpButtonClicked } from "../../ReduxStore/FeedDetails/feedActions";
import { Redirect } from "react-router-dom";

export const InternalSignUp = props => {

  const [userName, setUserName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  return (
    <div>
      {props.signUpStatus?  <Redirect to="/home" />
       :  
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
                type="button"
                onClick={()=> {
                  // 检查输入的类型
                  props.onSignUpButtonClicked(userName, email, password);
                }}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
        }
    </div>
  );
};

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUpButtonClicked: (userName, email, password) =>
      dispatch(onSignUpButtonClicked(userName, email, password)),
  };
};

export const SignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalSignUp);
