import React from "react";
import Home from "../App";
import SignIn from "./NavComponent/Sign_in";
import SignUp from "./NavComponent/Sign_up";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Nav = props => {
  return (
    <Router>
      <div>
        <nav class='navbar navbar-light'>
          <div class='container'>

            <a class='navbar-brand' href='index.html'>
              conduit
            </a>

            <ul class='nav navbar-nav pull-xs-right'>
              <li class='nav-item'>
                <Link class='nav-link active' to='/'>
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
          <Route path='/sign_in'><SignIn/></Route>
          <Route path='/sign_up'><SignUp/></Route>
          @@@@@@@@@@@@@@@现在卡住了。。。。。。。。。。。
        </Switch>
      </div>
    </Router>
  );
};

export default Nav;
