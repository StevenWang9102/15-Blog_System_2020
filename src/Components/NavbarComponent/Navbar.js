import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MainPage from "../MainPageComponent/MainPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function Navbar(props) {
  return (
    <Router>
      <div>
        <nav class='navbar navbar-light'>
          <div class='container'>
            <a class='navbar-brand' href='/home'>
              conduit
            </a>
            <ul class='nav navbar-nav pull-xs-right'>
              <li class='nav-item'>
                <Link class='nav-link active' to='/home'>
                  Home
                </Link>
              </li>
              <li class='nav-item'>
                <Link class='nav-link' to='/sign_in'>
                  Sign in
                </Link>
              </li>
              <li class='nav-item'>
                <Link class='nav-link' to='/sign_up'>
                  Sign up
                </Link>
              </li>
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
        </Switch>
      </div>
    </Router>
  );
}

export default Navbar;