import React from "react";
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";
import {MainPage} from "../MainPageComponent/MainPage";
import {ArticleDetails} from "../MainPageComponent/ArticleDetails";
import { UserProfile } from "../UserComponent/UserProfile"
import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

export const InternalNavbar = (props) => {
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
          <Route path="/article-detail/:article_slug">
            <ArticleDetails/>
          </Route>
          <Route path='/user-profile/:userName'>
            <UserProfile />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

const mapStateToProps = ({ currentArticleDetails }) => {
  return { currentArticleDetails };
};

export const Navbar = connect(
  mapStateToProps)(InternalNavbar);
