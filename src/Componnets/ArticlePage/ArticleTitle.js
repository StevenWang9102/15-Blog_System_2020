import React from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

export const ArticleTitle = props => {
  return (
    <div>
      <h1>{props.currentArticleDetails.title}</h1>

      <div className='article-meta article-source'>
        <Link
          to={"/user_profile/" + props.currentArticleDetails.author.username}>
          <img
            className='author-image'
            src={props.currentArticleDetails.author.image}
            alt='au'
          />
          <div className='info author'>
            {props.currentArticleDetails &&
              props.currentArticleDetails.author &&
              props.currentArticleDetails.author.username}

            <span className='date'>
              {dateFormat(
                props.currentArticleDetails.author &&
                  props.currentArticleDetails.author.updatedAt,
                "ddd mmm dd yyyy"
              )}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};