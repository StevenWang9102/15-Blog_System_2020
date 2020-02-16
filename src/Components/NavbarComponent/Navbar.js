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
import { getUserInformation } from "../../ReduxStore/FeedDetails/feedSagas"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


export const InternalNavbar = props => {

  
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
              {getUserInformation() && getUserInformation().token  ? (
                <div>
                  <li className='nav-item'>
                    <Link className='nav-link active' to='/home'>
                      Home
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link className='nav-link' to='/new_post'>
                      <img src='./icon/008-edit.png' alt='post' />
                      New Post
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link className='nav-link' to='/setting'>
                      <img src='./icon/004-settings.png' alt='setting' />
                      Setting
                    </Link>
                  </li>

                  {/* ---- Logged User ---- */}
                  <li className='nav-item'>
                    <Link className='nav-link' to='/user_profile'>
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
                    <Link className='nav-link' to='/sign_up'>
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
          <Route exact path='/sign_up'component={SignUp} />

          <Route path='/user_profile' component={UserProfile} />
          <Route path='/article-detail/:article_slug' component={ArticleDetails} />
          <Route exact path='/new_post' component={NewPost} />
          <Route exact path='/setting' component={Setting} />
        </Switch>

      </div>
    </Router>
  );
};

InternalNavbar.propTypes = {
  userInfo: PropTypes.object
};

const mapStateToProps = ({ userInfo }) => {
  return { userInfo };
};

export const Navbar = connect(mapStateToProps)(InternalNavbar);
