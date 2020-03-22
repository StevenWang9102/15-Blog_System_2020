import React from "react";
import { Link } from "react-router-dom";
import { FavoritedButton } from "../../Components/MainPage/FavoritedButton";
import { ArticleTitle } from "../../Components/ArticlePage/ArticleTitle";

export const CurrentDisplayArticles = props => {

  return (
    <div>
      {props.currentDisplayArticle.map((article, index) => {
    
        return (
          <div className='article-preview' key={index}>
            <div className='article-meta'>
              <ArticleTitle
                pageName={props.pageName}
                article={article}
                setLoading={props.setLoading}
                setProfileNavStatus={props.setProfileNavStatus}
                loadUserProfileDetail={props.loadUserProfileDetail}
              />

              <FavoritedButton
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
              className='nav-link preview-link article-detail'
              to={"/article-detail/" + article.slug}>
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
            </Link>
          </div>
        );
      })}

      {props.currentDisplayArticle &&
        props.currentDisplayArticle.length === 0 && (
          <div className='article-preview'>No articles are here... yet.</div>
        )}
    </div>
  );
};
