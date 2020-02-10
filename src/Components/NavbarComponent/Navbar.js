import React from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { MainPage } from "../MainPageComponent/MainPage";
import { NewPost } from "./NewPost";
import { Setting } from "./Setting";
import { connect } from "react-redux";
import { UserProfile } from "../UserComponent/UserProfile"
import { ArticleDetails } from "../MainPageComponent/ArticleDetails"
import PropTypes from "prop-types";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

export const InternalNavbar = props => {

  // const userName = props.userTokenName || null;
  console.log(sessionStorage.getItem('TokenName'));
  
  return (
    <Router>
      <div>
        <nav className='navbar navbar-light'>
          <div className='container'>
            
            <Link className='navbar-brand' to='/home'>
            conduit
            </Link>

            <ul className='nav navbar-nav pull-xs-right'>
              {sessionStorage.getItem('Token') ? (
                <div>
                  <li className='nav-item'>
                    <Link className='nav-link active' to='/home'>
                      Home
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link className='nav-link' to='/new_post'>
                      New Post
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link className='nav-link' to='/setting'>
                      Setting
                    </Link>
                  </li>

                  {/* Logged User */}
                  <li className='nav-item'>
                    <Link className='nav-link' to='/user_profile'>
                        {sessionStorage.getItem('TokenUserName') || '未登录'} 
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

        <Switch>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
          <Route exact path='/home'>
            <MainPage />
          </Route>

          <Route exact path='/sign_in'>
            <SignIn />
          </Route>
          <Route exact path='/sign_up'>
            <SignUp />
          </Route>

          <Route path='/user_profile'>
            <UserProfile />
          </Route>
          <Route path="/article-detail/:article_slug">
            <ArticleDetails/>
          </Route>

          <Route exact path='/new_post'>
            <NewPost />
          </Route>
          <Route exact path='/setting'>
            <Setting />
          </Route>

          
          
        </Switch>
      </div>
    </Router>
  );
};

InternalNavbar.propTypes = {
  userToken: PropTypes.string,
};

const mapStateToProps = ({ userToken, userTokenName }) => {
  return { userToken, userTokenName };
};

export const Navbar = connect(mapStateToProps)(InternalNavbar);
