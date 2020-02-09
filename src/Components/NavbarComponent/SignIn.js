import React from "react";
import { connect } from "react-redux";
import { signInClicked } from "../../ReduxStore/FeedDetails/feedActions";
import { Link } from "react-router-dom";

const InternalSignIn = props => {

  console.log(sessionStorage.getItem('email'));

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
                  value={sessionStorage.getItem('email')}
                  placeholder='Email'></input>
              </fieldset>

              <fieldset className='form-group'>
                <input
                  id='password'
                  className='form-control form-control-lg'
                  type='password'
                  placeholder='Password'></input>
              </fieldset>

              <button
                className='btn btn-lg btn-primary pull-xs-right'
                
                // 此处要更新
                onClick={event => {
                  event.preventDefault();
                  const email = document.querySelector("input[type='text']")
                    .value;
                  const password = document.querySelector(
                    "input[type='password']"
                  ).value;
                  props.onSignInClicked(email, password);

                  // tag Session Storage
                  // const user = { 'email': email, 'password': password }
                  sessionStorage.setItem('email', email)
                  sessionStorage.setItem('Token', props.userToken)

                  // 储存在本地
                  // 是用户登录状态 - 始终保持登录
                  // 那么哪些东西需要保存呢，答案如下
                  // 第一， props.userToken
                  // 第二， props.userToken
                  // props.userToken在哪里拿到的？
                  

                }}>
                <Link
                  className='nav-link preview-link article-detail'
                  to='/home'>
                  Sign in
                </Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { ...state };
}; 

const mapDispatchToProps = dispatch => {
  return {
    onSignInClicked: (email, password) =>
      dispatch(signInClicked(email, password))
  };
};

export const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalSignIn);
