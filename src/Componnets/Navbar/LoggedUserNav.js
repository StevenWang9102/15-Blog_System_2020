import React from "react";
import { Link } from "react-router-dom";
import { getUserFromSession } from "../../Functions/AuthToken";

export const LoggedUserNav = props => {

  const getUserInformationLocal = () => {
    if (
      !props.userInformation ||
      (props.userInformation && !props.userInformation.token)
    ) {
      const userInformationOnSession = getUserFromSession();
      if (userInformationOnSession) {
        props.userInformationLoaded({ user: userInformationOnSession });
      }
      return userInformationOnSession;
    } else {
      return props.userInformation;
    }
  };

  const userInfoLocal = getUserInformationLocal();

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
          <img src='../icon/008-edit.png' alt='' />
          New Post
        </Link>
      </li>

      <li className='nav-item'>
        <Link className='nav-link' to='/setting'>
          <img src='../icon/004-settings.png' alt='' />
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
