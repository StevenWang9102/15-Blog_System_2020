import React from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat"

const InternalArticlePreview = props => {

  return (
    <div class='col-md-9 col-sm-12'>
      <div class='feed-toggle'>
        <ul class='nav nav-pills outline-active'>
          <li class='nav-item'>
            <a class='nav-link active' href='#top'>
              Global Feed
                  </a>
          </li>
        </ul>
      </div>

      {props.articleLibrary &&
        props.articleLibrary.map((article, index) => {
          // console.log(article);
          return (
            <div class='article-preview' key={index}>
              <div class='article-meta'>
                <a href='profile.html'>
                  <img src={article.author.image} alt='author' />
                </a>
                <div class='info'>
                  <a href='#top' class='author'>
                    {article.author.username}
                  </a>
                  <span class='date'>
                    {dateFormat(article.updatedAt, "ddd mmm dd yyyy")}
                  </span>
                </div>
                <button class='btn btn-outline-primary btn-sm pull-xs-right'>
                  <i class='ion-heart'></i> {article.favoritesCount}
                </button>
              </div>
              <a href='#top' class='preview-link'>
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>Read more...</span>
              </a>
            </div>
          );
        })}
    </div>
  );
};

const mapStateToProps = state => {
  return { ...state };
};

const mapDismatchToProps = dispatch => {
  return {};
};

export const ArticlePreview = connect(mapStateToProps, mapDismatchToProps)(InternalArticlePreview);
