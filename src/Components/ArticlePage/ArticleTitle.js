import React from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { displayLimit, offset } from "../../Functions/HttpClient";

export const ArticleTitle = props => {

  const usernameLocal =
    props.article && props.article.author && props.article.author.username;
  const imageLocal =
    props.article && props.article.author && props.article.author.image;
  const updateAtLocal =
    props.article && props.article.author && props.article.author.updatedAt;

  return (
    <Link to={`/user_profile/${usernameLocal}`}>
      <img className='author-image' src={imageLocal} alt='au' />
      <div
        className='info author'
        onClick={() => {
          props.setLoading("LOADING");

          if (props.pageName === "User Profile") {
            props.setProfileNavStatus("active", "null");
            props.loadUserProfileDetail(usernameLocal, displayLimit, offset);
          }
        }}>
        {usernameLocal}
        <span className='date'>
          {dateFormat(updateAtLocal, "ddd mmm dd yyyy")}
        </span>
      </div>
    </Link>
  );
};
