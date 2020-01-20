import React from 'react';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { articleTitleClicked } from '../../ReduxStore/FeedDetails/feedActions';

const InternalArticlePreview = props => {

  return (
    <div className="col-md-9 col-sm-12">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <a className="nav-link active" href="#top">
              Global Feed
            </a>
          </li>
        </ul>
      </div>

      {props.articleLibrary &&
        props.articleLibrary.map((article, index) => {
          return (
            <div className="article-preview" key={index}>
              <div className="article-meta">
                <a href="profile.html">
                  <img
                    className="author-image"
                    src={article.author.image}
                    alt=""
                  />
                </a>
                <div className="info">
                  <a href="#top" className="author">
                    {article.author.username}
                  </a>
                  <span className="date">
                    {dateFormat(article.updatedAt, "ddd mmm dd yyyy")}
                  </span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> {article.favoritesCount}
                </button>
              </div>
              <Link
                className="nav-link preview-link article-detail"
                to="/article-detail">
                <h1
                  onClick={() => {
                    props.onArticleClick(article.title, article.slug);                    
                  }}>
                  {article.title}
                </h1>
                <p>{article.description}</p>
                <span>Read more...</span>
              </Link>
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
  return {
    onArticleClick: (title, slug) => dispatch(articleTitleClicked(title, slug))
  };
};

export const ArticlePreview = connect(
  mapStateToProps,
  mapDismatchToProps
)(InternalArticlePreview);
