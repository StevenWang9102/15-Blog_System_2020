import React from "react";
import { Link } from "react-router-dom";

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
            props.loadUserProfileDetail(userInfoLocal.username, 5, 0);
            props.setProfileNavStatus("active", "null");
            props.setLoading("LOADING");
          }}>
          <img className='user-pic' src={userInfoLocal.image} alt='' />
          {userInfoLocal.username}
        </Link>
      </li>
    </div>
  );
};