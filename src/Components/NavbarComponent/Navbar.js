import React from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { MainPage } from "../MainPageComponent/MainPage";
import { NewPost } from "./NewPost";
import { Setting } from "./Setting";
import { connect } from "react-redux";

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
            <a className='navbar-brand' href='/home'>
              conduit
            </a>
            <ul className='nav navbar-nav pull-xs-right'>
              {props.userToken ? (
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

          {/* New */}
          <Route path='/new_post'>
            <NewPost />
          </Route>
          <Route path='/setting'>
            <Setting />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = ({ currentArticleDetails, userToken }) => {
  return { currentArticleDetails, userToken };
};

export const Navbar = connect(mapStateToProps)(InternalNavbar);
