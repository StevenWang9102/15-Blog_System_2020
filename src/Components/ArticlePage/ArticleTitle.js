import React from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

export const ArticleTitle = props => {
  const authorLocal = props.currentArticleDetails.author;
  const username = authorLocal && authorLocal.username;
  const image = authorLocal && authorLocal.image;
  const updateAt = authorLocal && authorLocal.updatedAt;

  return (
    <Link to={"/user_profile/" + username}>
      <img className='author-image' src={image} alt='au' />
      <div
        className='info author'
        onClick={() => {
          props.setLoading("LOADING");
        }}>
        {username}
        <span className='date'>{dateFormat(updateAt, "ddd mmm dd yyyy")}</span>
      </div>
    </Link>
  );
};
