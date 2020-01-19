import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import MainPage from '../MainPageComponent/MainPage';
import ArticleDetails from '../MainPageComponent/ArticleDetails';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

function Navbar(props) {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-light">
          <div className="container">
            <a className="navbar-brand" href="/home">
              conduit
            </a>
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                <Link className="nav-link active" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sign_in">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sign_up">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/home">
            <MainPage />
          </Route>
          <Route exact path="/sign_in">
            <SignIn />
          </Route>
          <Route exact path="/sign_up">
            <SignUp />
          </Route>
          <Route exact path="/article-detail">
            <ArticleDetails/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Navbar;
