import React from "react";
import { displayLimit, offset } from "../../Functions/HttpClient";
import { NavLink } from "react-router-dom";

export const UserProfileNav = props => {
  return (
    <div className='articles-toggle'>
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <NavLink
            to={`/user_profile/${props.author_name}/my_articles`}
            className={`nav-link ${props.profileNavStatusLeft}`}
            onClick={() => {
              props.setProfileNavStatus("active", "null");
              props.loadUserProfileDetail(
                props.author_name,
                displayLimit,
                offset
              );
            }}>
            My Articles
          </NavLink>
        </li>

        <li className='nav-item'>
          <NavLink
            to={`/user_profile/${props.author_name}/favorited_articles`}
            className={`nav-link ${props.profileNavStatusRight}`}
            onClick={() => {
              props.setProfileNavStatus("null", "active");
              props.onFavoritedArticleNavClicked(
                props.author_name,
                displayLimit,
                offset
              );
            }}>
            Favorited Articles
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
