import React from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { articleCountDisplay, articleOffSet} from "../../Functions/httpMethods"

export const ArticleTitle = props => {
  const username =
    props.currentArticleDetails.author &&
    props.currentArticleDetails.author.username;
  const image =
    props.currentArticleDetails.author &&
    props.currentArticleDetails.author.image;
  const updateAt =
    props.currentArticleDetails.author &&
    props.currentArticleDetails.author.updatedAt;
    
  return (
    <Link to={"/user_profile/" + username}>
      <img className='author-image' src={image} alt='au' />
      <div
        className='info author'
        onClick={() => {
          props.setLoading("LOADING");
          props.loadUserProfileDetail(username, articleCountDisplay, articleOffSet);
          props.emptyArticleAllCount();
        }}>
        {username}

        <span className='date'>{dateFormat(updateAt, "ddd mmm dd yyyy")}</span>
      </div>
    </Link>
  );
};
