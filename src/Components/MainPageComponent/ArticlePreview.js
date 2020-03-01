import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import {
  articleTitleClicked,
  loadGlobalFeeds,
  loadYourArticles,
  favoritedButtonClicked,
  setHomeNavStatus,
  loadPopularTags
} from "../../ReduxStore/FeedDetails/feedActions";
// import { NavLink } from "react-router-dom";

const InternalArticlePreview = props => {
  const [httpMethod, setHttpMethod] = useState({});

  useEffect(() => {
    if (props.userInformation.username) {
      props.setHomeNavStatus("active", "null", "null");
      props.loadPopularTags();
      props.loadYourFeedArticles();
    } else {
      props.setHomeNavStatus("active", "active", "null");
      props.loadPopularTags();
      props.loadGlobalFeeds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='col-md-9 col-sm-12'>
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active '>
          <li className='nav-item'>

            {/* ------------------ Your Feed ----------------- */}
            {props.userInformation.token && (
              <Link
                onClick={() => {
                  props.onYourFeedClicked();
                  props.setHomeNavStatus("active", "null", "null");
                }}
                className={`nav-link display-inline ${props.yourNav} `}
                to='/home#your_feed'>
                Your Feed
              </Link>
            )}

            {/* ------------------ Global Feed ------------------ */}
            <Link
              onClick={() => {
                props.onGlobeFeedClicked();
                props.setHomeNavStatus("null", "active", "null");
              }}
              className={`nav-link ${props.favoriteNav} display-inline`}
              to='/home#global_feed'>
              Global Feed
            </Link>

            {/* ----------------- Popular Tags --------------- */}
            {props.currentTagName && (
              <Link
                className={`nav-link ${props.popularNav} display-inline`}
                to='/home#popular_tags'>
                # {props.currentTagName}
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* --------------------- Related Articles --------------------- */}
      {props.currentHomeDisplayArticle.map((article, index) => {
        return (
          <div className='article-preview' key={index}>
            <div className='article-meta'>
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

              <button
                type='button'
                className='btn btn-outline-primary btn-sm pull-xs-right'
                onClick={() => {
                  const tempMethod = { ...httpMethod };
                  if (tempMethod[article.slug] === "POST") {
                    tempMethod[article.slug] = "DELETE";
                  } else {
                    tempMethod[article.slug] = "POST";
                  }
                  const token =
                  props.userInformation.token;
                  token &&
                    props.onFavoritedButtonClicked(
                      token,
                      article.slug,
                      tempMethod[article.slug]
                    );
                  setHttpMethod(tempMethod);
                }}>
                <img src='./icon/002-heart-2.png' alt='love' />
                {article.favoritesCount}
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
      })}
      {props.currentHomeDisplayArticle.length === 0 && (
        <div className='article-preview'>No articles are here... yet.</div>
      )}
    </div>
  );
};

InternalArticlePreview.propTypes = {
  currentTagName: PropTypes.string,
  tagRelatedArticles: PropTypes.array,
  globalArticles: PropTypes.array.isRequired,
  onArticleClick: PropTypes.func
};

const mapStateToProps = ({
  globalArticles,
  onArticleClick,
  tagRelatedArticles,
  favorited_article,
  currentTagName,
  yourArticles,
  userInformation,
  smallNavStatus,
  selfStatus,
  yourNav,
  favoriteNav,
  popularNav,
  currentHomeDisplayArticle
}) => {
  return {
    globalArticles,
    onArticleClick,
    tagRelatedArticles,
    favorited_article,
    userInformation,
    currentTagName,
    yourArticles,
    smallNavStatus,
    selfStatus,
    yourNav,
    favoriteNav,
    popularNav,
    currentHomeDisplayArticle
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onArticleClick: (title, slug) => dispatch(articleTitleClicked(title, slug)),
    onGlobeFeedClicked: () => dispatch(loadGlobalFeeds()),
    setHomeNavStatus: (your, favorite, popular) => dispatch(setHomeNavStatus(your, favorite, popular)),
    onYourFeedClicked: () => dispatch(loadYourArticles()),
    loadYourFeedArticles: () => dispatch(loadYourArticles()),
    onFavoritedButtonClicked: (token, slug, httpMethod) =>
      dispatch(favoritedButtonClicked(token, slug, httpMethod)),
    loadGlobalFeeds: () => {
      dispatch(loadGlobalFeeds());
    },
    loadPopularTags: () => {
      dispatch(loadPopularTags());
    }
  };
};

export const ArticlePreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticlePreview);
