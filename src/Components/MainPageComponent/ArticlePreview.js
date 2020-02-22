import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { getUserInformation } from "../../ReduxStore/FeedDetails/feedSagas";
import {
  articleTitleClicked,
  loadGlobalFeeds,
  loadYourArticles,
  favoritedButtonClicked,
  setHomeNavStatus,
  loadPopularTags
} from "../../ReduxStore/FeedDetails/feedActions";
import { NavLink } from "react-router-dom";

const InternalArticlePreview = props => {
  useEffect(() => {
    if (getUserInformation() && getUserInformation().username) {
      props.setHomeNavStatus(["active", "null", "null"]);
      props.loadPopularTags();
      props.loadYourFeedArticles();
    } else {
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
            {/* ------------ Your Feed ------------ */}
            {getUserInformation() && getUserInformation().token && (
              <NavLink
                onClick={() => {
                  props.onYourFeedClicked();
                  props.setHomeNavStatus(["active", "null", "null"]);
                }}
                className='nav-link display-inline'
                activeClassName={props.homeNavStatus && props.homeNavStatus[0]}
                to='/home#your_feed'>
                Your Feed
              </NavLink>
            )}

            {/* ------------ Global Feed ------------ */}
            <NavLink
              onClick={() => {
                props.onGlobeFeedClicked();
                props.setHomeNavStatus(["null", "active", "null"]);
              }}
              className='nav-link display-inline'
              //
              //
              activeClassName={props.homeNavStatus && props.homeNavStatus[1]}
              to='/home#global_feed'>
              Global Feed
            </NavLink>

            {/* ----------- Popular Tags --------- */}
            {props.currentTagName && (
              <NavLink
                className='nav-link display-inline'
                activeClassName={props.homeNavStatus && props.homeNavStatus[2]}
                to='/home#popular_tags'>
                # {props.currentTagName}
              </NavLink>
            )}
          </li>
        </ul>
      </div>

      {/* --------------------- Article --------------------- */}
      {/* <div className='article-preview'>No articles are here... yet.</div> */}
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
                  //
                  //
                  // 暂时用这个 getUserInformation
                  const token = getUserInformation().token;
                  if (token)
                    props.onFavoritedButtonClicked(token, article.slug);
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
  currentTagName,
  yourArticles,
  userInformation,
  smallNavStatus,
  selfStatus,
  homeNavStatus,
  currentHomeDisplayArticle
}) => {
  return {
    globalArticles,
    onArticleClick,
    tagRelatedArticles,
    userInformation,
    currentTagName,
    yourArticles,
    smallNavStatus,
    selfStatus,
    homeNavStatus,
    // globalFeeds,
    currentHomeDisplayArticle
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // 以下似乎很多冗余
    // 以下似乎很多冗余
    // 以下似乎很多冗余

    onArticleClick: (title, slug) => dispatch(articleTitleClicked(title, slug)),
    onGlobeFeedClicked: () => dispatch(loadGlobalFeeds()),
    setHomeNavStatus: status => dispatch(setHomeNavStatus(status)),
    onYourFeedClicked: () => dispatch(loadYourArticles()),
    loadYourFeedArticles: () => dispatch(loadYourArticles()),
    onFavoritedButtonClicked: (token, slug) =>
      dispatch(favoritedButtonClicked(token, slug)),
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
