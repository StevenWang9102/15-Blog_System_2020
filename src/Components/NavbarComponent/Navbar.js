import React from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { MainPage } from "../MainPageComponent/MainPage";
import { NewPost } from "./NewPost";
import { Setting } from "./Setting";
import { connect } from "react-redux";
import { UserProfile } from "../UserComponent/UserProfile";
import { ArticleDetails } from "../MainPageComponent/ArticleDetails";
import PropTypes from "prop-types";
import {
  loadUserProfileDetail,
  setProfileNavStatus,
  onSignUpButtonClicked,
  postedArticleReloaded,
  userInformationLoaded
} from "../../ReduxStore/FeedDetails/feedActions";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { getUserFromSession } from "../UserComponent/AuthToken";



const InternalNavbar = props => {

  const getUserInformationLocal = () =>{
    if(!props.userInformation || (props.userInformation && !props.userInformation.token)){
      // 上面再细节研究一下，为什么？@@@@@@@@@
      const userInfo = getUserFromSession();
      if(userInfo) {
        props.userInformationLoaded({user:userInfo}); 
      }// send userInfo to redux store
      return userInfo;
    }else{
      return props.userInformation
    }
  }

  console.log(getUserFromSession());
  // 说明储存目前用户的信息都是失败的。。。
  
  return (
    
    <Router>
      <div>
        <nav className='navbar navbar-light'>
          <div className='container'>

            {/* --------------- ROUTER LINK --------------- */}
            <Link className='navbar-brand' to='/home'>
              conduit
            </Link>

            <ul className='nav navbar-nav pull-xs-right'>
              {getUserInformationLocal() ? (
                // 为什么现在登录之后，并不更新状态
                // 因为这个判据要是从state上面拿到，当发生变化的时候，才会更新Nav
                // 也就是说，在触发登录按钮的时候，我们要更新userInformation
                // 确实是设置了 userInformation
                // 
                <div>
                  <li className='nav-item'>
                    <Link className='nav-link active' to='/home'>
                      Home
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      to='/new_post'
                      onClick={() => {
                        props.postedArticleReloaded(false);
                      }}>
                      <img src='./icon/008-edit.png' alt='' />
                      New Post
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link className='nav-link' to='/setting'>
                      <img src='./icon/004-settings.png' alt='' />
                      Setting
                    </Link>
                  </li>

                  {/* ---- Logged User ---- */}
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      // to={`/user_profile/${getUserInformationLocal().username}`}
                      onClick={() => {
                        props.loadUserProfileDetail();
                        props.setProfileNavStatus("active", "null");
                      }}>
                      <img
                        className='user-pic'
                        // src={getUserInformationLocal().image}
                        alt=''
                      />
                      {/* {getUserInformationLocal().username} */}
                    </Link>
                  </li>
                </div>
              ) : (
                <div>
                  <li className='nav-item'>
                    <Link className='nav-link active' to='/home'>
                      Home
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/sign_in'>
                      Sign in
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      to='/sign_up'
                      onClick={() => {
                        props.onSignUpButtonClicked(null);
                      }}>
                      Sign up
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </nav>

        {/* --------------- ROUTER SWITCH --------------- */}
        <Switch>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
          <Route exact path='/home' component={MainPage} />

          <Route exact path='/article-detail/sign_in'>
            <Redirect to='/sign_in' />
          </Route>
          <Route exact path='/sign_in' component={SignIn} />

          <Route exact path='/article-detail/sign_up'>
            <Redirect to='/sign_up' />
          </Route>
          <Route exact path='/sign_up' component={SignUp} />

          <Route path='/user_profile/:author_name/:article_type' component={UserProfile} />
          <Route path='/user_profile/:author_name' component={UserProfile} />

          <Route
            path='/article-detail/:article_slug'
            component={ArticleDetails}
          />
          <Route path='/new_post/:slug' component={NewPost} />
          <Route path='/new_post' component={NewPost} />

          <Route exact path='/setting' component={Setting} />
        </Switch>
      </div>
    </Router>
  );
};

InternalNavbar.propTypes = {
  loadUserProfileDetail: PropTypes.func
};

const mapStateToProps = ({ loadUserProfileDetail, userInformation }) => {
  return { loadUserProfileDetail, userInformation };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserProfileDetail: () => dispatch(loadUserProfileDetail()),
    setProfileNavStatus: (profileNavStatusLeft, profileNavStatusRight) =>
      dispatch(
        setProfileNavStatus(profileNavStatusLeft, profileNavStatusRight)
      ),
    onSignUpButtonClicked: data => dispatch(onSignUpButtonClicked(data)),
    // postedArticleReloaded
    postedArticleReloaded: data => dispatch(postedArticleReloaded(data)),
    // userInformationLoaded
    userInformationLoaded: user => dispatch(userInformationLoaded(user)),

  };
};

export const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalNavbar);
