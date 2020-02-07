import React from "react";
import { connect } from "react-redux";
import { signInClicked } from "../../ReduxStore/FeedDetails/feedActions"

const InternalSignIn = props => {

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign in</h1>
            <p className='text-xs-center'>
              <a href='#top'> Need an account? </a>
            </p>
            
            <form>

              <fieldset className='form-group'>
                <input
                  id='username'
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Email'></input>
              </fieldset>

              <fieldset className='form-group'>
                <input
                  id='password'
                  className='form-control form-control-lg'
                  type='password'
                  placeholder='Password'></input>
              </fieldset>

              <button className='btn btn-lg btn-primary pull-xs-right'
                onClick={(event)=>{
                  event.preventDefault();
                  const email = document.querySelector("input[type='text']").value;
                  const password = document.querySelector("input[type='password']").value;
                  props.onSignInClicked(email, password)
                }}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {...state }
}
//去掉报错。。。

const mapDispatchToProps = dispatch => {
  return {
    onSignInClicked: (email, password) => dispatch(signInClicked(email, password))
  };
};

export const SignIn = connect(
  mapStateToProps, mapDispatchToProps
)(InternalSignIn);
