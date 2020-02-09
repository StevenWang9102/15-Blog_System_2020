import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import {
  articleTitleClicked,
  globeFeedClicked,
  loadYourArticles
} from "../../ReduxStore/FeedDetails/feedActions";

const InternalArticlePreview = props => {

  useEffect(() => {
    props.onYourArticleNeeded(props.userToken);
  }, [props, props.userToken]);

  return (
    <div className='col-md-9 col-sm-12'>

      {/* --------------------- Navigation --------------------- */}
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active '>
          <li className='nav-item'>

            {/* Your Feeds */}
            {sessionStorage.getItem('Token') && (
                <a
                  className='nav-link active display-inline'
                  href='#top'
                  onClick={() => {
                    props.onGlobeFeedClicked();
                  }}>
                  Your Feed
                </a>
            )}
            
            {/* Globel Feeds */}
            <a
              className='nav-link active display-inline'
              href='#top'
              onClick={() => {
                props.onGlobeFeedClicked();
              }}>
              Global Feed
            </a>

            {/* Tag Feeds */}
            {props.currentTagName && (
              <a className='nav-link active display-inline' href='#top'>
                # {props.currentTagName}
              </a>
            )}
          </li>
        </ul>
      </div>

      {/* --------------------- Article --------------------- */}
      {(props.tagRelatedArticles || props.articleLibrary).map(
        (article, index) => {
          return (
            <div className='article-preview' key={index}>
              <div className='article-meta'>
                
                {/* 
                  链接到用户页面
                  访问用户页面
                  用户页面开始请求
                */}

                <Link to={"/user_profile/" + article.author.username}>
                  <img
                    className='author-image'
                    src={article.author.image}
                    alt='au'
                  />

                  <div className='info author'>
                    {article.author.username}
                    <span className='date'>
                      {dateFormat(article.updatedAt, "ddd mmm dd yyyy")}
                    </span>
                  </div>
                </Link>

                <button className='btn btn-outline-primary btn-sm pull-xs-right'>
                  <i className='ion-heart'></i> {article.favoritesCount}
                </button>
              </div>

              <Link
                className='nav-link preview-link article-detail'
                to={"/article-detail/" + article.slug}>
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
        }
      )}
    </div>
  );
};

InternalArticlePreview.propTypes = {
  currentTagName: PropTypes.string,
  tagRelatedArticles: PropTypes.array,
  articleLibrary: PropTypes.array.isRequired,
  onArticleClick: PropTypes.func,
  userToken: PropTypes.string,
};

const mapStateToProps = ({
  articleLibrary,
  onArticleClick,
  tagRelatedArticles,
  currentTagName,
  userToken
}) => {
  return {
    articleLibrary,
    onArticleClick,
    tagRelatedArticles,
    currentTagName,
    userToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onArticleClick: (title, slug) => dispatch(articleTitleClicked(title, slug)),
    onGlobeFeedClicked: () => dispatch(globeFeedClicked()),
    onYourArticleNeeded: () => dispatch(loadYourArticles())
  };
};

export const ArticlePreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticlePreview);
