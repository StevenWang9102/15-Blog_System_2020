import React from "react";
import dateFormat from "dateformat";
import { FavoritedButton } from "../MainPage/FavoritedButton"

import {
  articleCountDisplay,
  articleOffSet
} from "../../Functions/httpMethods";
import { Link } from "react-router-dom";

export const UserProfileDisplayArticles = props => {

  return (
    <div>
      {props.currentProfileDisplayArticle &&
        props.currentProfileDisplayArticle.map((article, index) => {
          return (
            <div className='article-preview' key={index}>
              <div className='article-meta'>
                <Link to={"/user_profile/" + article.author.username}>
                  <img src={article.author.image} alt='au' />
                </Link>

                <div className='info'>
                  <Link
                    to={"/user_profile/" + article.author.username}
                    className='author'
                    onClick={() =>{
                      props.setProfileNavStatus("active", "null");
                      props.loadUserProfileDetail(
                        article.author.username,
                        articleCountDisplay,
                        articleOffSet
                      )}
                    }>
                      {/* setProfileNavStatus */}
                    {article.author.username }
                  </Link>
                  <span className='date'>
                    {dateFormat(article.updatedAt, "ddd mmm dd yyyy")}
                  </span>
                </div>

                <FavoritedButton
                  author_name={props.author_name}
                  httpMethod={props.httpMethod}
                  setHttpMethod={props.setHttpMethod}
                  article={article}
                  userInformation={props.userInformation}
                  setLoading={props.setLoading}
                  currentPageOffSet={props.currentPageOffSet}
                  onFavoritedArticleClicked={props.onFavoritedArticleClicked}
              />
              </div>

              <Link
                to={"/article-detail/" + article.slug}
                className='preview-link'>
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>Read more...</span>
              </Link>
            </div>
          );
        })}

      {props.currentProfileDisplayArticle &&
        props.currentProfileDisplayArticle.length === 0 && (
          <div className='article-preview'>No articles are here... yet.</div>
        )}
    </div>
  );
};
