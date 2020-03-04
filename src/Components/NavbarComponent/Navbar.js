import React from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { MainPage } from "../MainPageComponent/MainPage";
import { NewPost } from "./NewPost";
import { Setting } from "./Setting";
import { connect } from "react-redux";
import { createUseStyles } from "react-jss";
import { UserProfile } from "../UserComponent/UserProfile";
import { ArticleDetails } from "../MainPageComponent/ArticleDetails";
import PropTypes from "prop-types";
import { getUserInformation } from "../../ReduxStore/FeedDetails/feedSagas";
import {
  loadUserProfileDetail,
  setProfileNavStatus,
  onSignUpButtonClicked,
  postedArticleReloaded
} from "../../ReduxStore/FeedDetails/feedActions";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// ---------------- React-JSS-Configuration -------------------- //
// const useStyles = createUseStyles({
//   // 这个是公用的定义
//   myImage: {
//       height: 26 !important,
//       width: 26,
//       objectFit: 'cover',
//       marginRight: 3
//   }
// });

// // 这个是制定的定义
// const Img = ({ children }) => {
//   const classes = useStyles(); // 调取公用的定义
//   return (
//     <div className= {`${classes.myImage} user-pic`}>
//       <img src={getUserInformation() && getUserInformation().image}  alt="user"/>
//       {children}
//     </div>
//   );
// };

// ---------------- React-Component -------------------- //
const InternalNavbar = props => {

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
              {getUserInformation() ? (
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
                      onClick={()=>{props.postedArticleReloaded(false)}}  
                    >
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
                      to = {`/user_profile/${getUserInformation().username}`}
                      onClick={() => {
                        props.loadUserProfileDetail();
                        props.setProfileNavStatus("active", "null");
                      }}>
                      <img
                        className='user-pic'
                        src={getUserInformation().image}
                        alt=''
                      />
                      {/* <Img/> */}
                      {getUserInformation().username}
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
  loadUserProfileDetail: PropTypes.func,
};

const mapStateToProps = ({ loadUserProfileDetail }) => {
  return { loadUserProfileDetail };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserProfileDetail: () => dispatch(loadUserProfileDetail()),
    setProfileNavStatus: (myNav, favorited_Nav) =>
      dispatch(setProfileNavStatus(myNav, favorited_Nav)),
    onSignUpButtonClicked: data => dispatch(onSignUpButtonClicked(data)),
    // postedArticleReloaded
    postedArticleReloaded: data => dispatch(postedArticleReloaded(data)),

  };
};

export const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalNavbar);
