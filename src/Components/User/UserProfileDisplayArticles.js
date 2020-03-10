import React from "react";
import dateFormat from "dateformat";

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
                    onClick={() =>
                      props.loadUserProfileDetail(
                        article.author.username,
                        articleCountDisplay,
                        articleOffSet
                      )
                    }>
                    {article.author.username}
                  </Link>
                  <span className='date'>
                    {dateFormat(article.updatedAt, "ddd mmm dd yyyy")}
                  </span>
                </div>

                
                <button
                  className='btn btn-outline-primary btn-sm pull-xs-right'
                  onClick={() => {
                    const tempMethod = { ...props.httpMethod };
                    if (tempMethod[article.slug] === "DELETE") {
                      tempMethod[article.slug] = "POST";
                    } else {
                      tempMethod[article.slug] = "DELETE";
                    }
                    const token = props.userInformation.token;
                    token &&
                      props.onFavoritedArticleClicked(
                        token,
                        article.slug,
                        tempMethod[article.slug],
                        props.author_name
                      );
                      props.setHttpMethod(tempMethod);
                  }}>
                  <i className='ion-heart'></i>
                  <img src='../../icon/002-heart-2.png' alt='' />
                  {article.favoritesCount}
                </button>
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
