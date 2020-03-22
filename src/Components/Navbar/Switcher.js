import React from "react";
import { SignIn } from "../../Containers/Navbar/SignIn";
import { SignUp } from "../../Containers/Navbar/SignUp";
import { MainPage } from "../../Containers/MainPage/MainPage";
import { NewPost } from "../../Containers/Navbar/NewPost";
import { Setting } from "../../Containers/Navbar/Setting";
import { UserProfile } from "../../Containers/User/UserProfile";
import { ArticleDetails } from "../../Containers/ArticlePage/ArticleDetails";

import { Switch, Route, Redirect } from "react-router-dom";

export const Switcher = props => {
  return (
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
        path='/user_profile/:author_name/:article_type' component={UserProfile}
      />
      <Route path='/user_profile/:author_name' component={UserProfile} />

      <Route path='/article-detail/:article_slug' component={ArticleDetails} />
      <Route path='/new_post/:slug' component={NewPost} />
      <Route path='/new_post' component={NewPost} />

      <Route exact path='/setting' component={Setting} />
    </Switch>
  );
};
