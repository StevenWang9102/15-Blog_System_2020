import React from "react";
import { useEffect } from "react";
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
  userInformationLoaded,
  onSignUpButtonClicked,
} from "../../ReduxStore/Actions/userActions";

import {
setProfileNavStatus,
postedArticleReloaded,
updateSettingStatus,
setLoading
} from "../../ReduxStore/Actions/eventActions";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { getUserFromSession } from "../UserComponent/AuthToken";

const InternalNavbar = props => {
  
  const getUserInformationLocal = () => {
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

  useEffect(() => {
    getUserInformationLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userInfoLocal = getUserInformationLocal();


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

              {props.userInformation && props.userInformation.token ? (  
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
                      <img src='./icon/004-settings.png' alt=''/>
                      Setting
                    </Link>
                  </li>

                  {/* ---- Logged User ---- */}
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      to={`/user_profile/${userInfoLocal.username}`}
                      onClick={() => {
                        props.loadUserProfileDetail(userInfoLocal.username, 5, 0);
                        props.setProfileNavStatus("active", "null");
                        props.setLoading("LOADING")
                      }}
                      >
                      <img
                        className='user-pic'
                        src={userInfoLocal.image}
                        alt=''
                      />
                      {userInfoLocal.username}
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
          <Route path='/home' component={MainPage} />

          <Route exact path='/article-detail/sign_in'>
            <Redirect to='/sign_in' />
          </Route>
          <Route exact path='/sign_in' component={SignIn} />

          <Route exact path='/article-detail/sign_up'>
            <Redirect to='/sign_up' />
          </Route>
          <Route exact path='/sign_up' component={SignUp} />

          <Route
            path='/user_profile/:author_name/:article_type'
            component={UserProfile}
          />
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

const mapStateToProps = ({userReducer}) => {
  const {
    userInformation
  } = userReducer

  return {
    userInformation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserProfileDetail: (author_name, articleCountDisplay, articleOffSet) => dispatch(loadUserProfileDetail(author_name, articleCountDisplay, articleOffSet)),
    updateSettingStatus: status => dispatch(updateSettingStatus(status)),
    setProfileNavStatus: (profileNavStatusLeft, profileNavStatusRight) =>
      dispatch(
        setProfileNavStatus(profileNavStatusLeft, profileNavStatusRight)
      ),
    onSignUpButtonClicked: data => dispatch(onSignUpButtonClicked(data)),
    postedArticleReloaded: data => dispatch(postedArticleReloaded(data)),
    userInformationLoaded: user => dispatch(userInformationLoaded(user)),
    setLoading: (status) => dispatch(setLoading(status)),

  };
};

export const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalNavbar);
