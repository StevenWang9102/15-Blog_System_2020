import React from "react";
import { Link } from "react-router-dom";
import {displayLimit, offset } from "../../ReduxStore/HttpClient"
import PropTypes from "prop-types";

export const LoggedUserNav = props => {


  const userInfoLocal = props.getUserInformationLocal();

  return (
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
          <img src='../../icon/008-edit.png' alt='' />
          New Post
        </Link>
      </li>

      <li className='nav-item'>
        <Link className='nav-link' to='/setting'>
          <img src='../../icon/004-settings.png' alt='' />
          Setting
        </Link>
      </li>

      <li className='nav-item'>
        <Link
          className='nav-link'
          to={`/user_profile/${userInfoLocal.username}`}
          onClick={() => {
            props.loadUserProfileDetail(userInfoLocal.username, displayLimit, offset);
            props.setProfileNavStatus("active", "null");
          }}>
          <img className='user-pic' src={userInfoLocal.image} alt='' />
          {userInfoLocal.username}
        </Link>
      </li>
    </div>
  );
};

LoggedUserNav.propTypes = {
  getUserInformationLocal: PropTypes.func,
  postedArticleReloaded: PropTypes.func,
  loadUserProfileDetail: PropTypes.func,
  setProfileNavStatus: PropTypes.func,
};