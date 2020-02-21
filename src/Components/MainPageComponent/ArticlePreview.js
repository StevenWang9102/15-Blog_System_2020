import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { getUserInformation } from "../../ReduxStore/FeedDetails/feedSagas";

import {
  articleTitleClicked,
  loadInitialData,
  loadYourArticles,
  favoritedButtonClicked,
  setNavStatus
} from "../../ReduxStore/FeedDetails/feedActions";
import { NavLink } from "react-router-dom";

const InternalArticlePreview = props => {
  useEffect(() => {
    props.userInfo &&
      props.userInfo.token &&
      props.onYourArticleNeeded(props.userInfo.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='col-md-9 col-sm-12'>
      {/* --------------------- Navigation --------------------- */}
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active '>
          <li className='nav-item'>
            {/* ----- Your Feed ----- */}
            {getUserInformation() && getUserInformation().token && (
              <NavLink
                onClick={() => {
                  props.onYourFeedClicked();
                  props.setNavStatus("active", "null", "null");
                }}
                className='nav-link display-inline'
                activeClassName={props.status1}
                to='/home#your_feed'>
                Your Feed
              </NavLink>
            )}

            {/* ----- Global Feed ----- */}
            <NavLink
              onClick={() => {
                props.onGlobeFeedClicked();
                props.setNavStatus("null", "active", "null");
              }}
              className='nav-link display-inline'
              activeClassName={props.status2}
              to='/home#global_feed'>
              Global Feed
            </NavLink>

            {/* ----------- Popular Tags --------- */}
            {props.currentTagName && (
              <NavLink
                className='nav-link display-inline'
                activeClassName='active'
                to='/home#popular_tags'>
                # {props.currentTagName}
              </NavLink>
            )}
          </li>
        </ul>
      </div>

      {/* --------------------- Article --------------------- */}
      {getUserInformation() &&
        props.yourArticles === null &&
        !props.globalFeeds ? (
          <div className='article-preview'>No articles are here... yet.</div>
        ) : (
          (getUserInformation()
            ? props.tagRelatedArticles ||
            (props.yourArticles && props.yourArticles.length > 0 && props.yourArticles) ||
            props.globalFeeds
            : props.tagRelatedArticles || props.globalFeeds
          ).map((article, index) => {
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
                    className='btn btn-outline-primary btn-sm pull-xs-right'
                    onClick={() => {
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
          })
        )}
    </div>
  );
};

InternalArticlePreview.propTypes = {
  currentTagName: PropTypes.string,
  tagRelatedArticles: PropTypes.array,
  articleLibrary: PropTypes.array.isRequired,
  onArticleClick: PropTypes.func,
  userInfo: PropTypes.object
};

const mapStateToProps = ({
  articleLibrary,
  onArticleClick,
  tagRelatedArticles,
  currentTagName,
  userInfo,
  yourArticles,
  smallNavStatus,
  selfStatus,
  status3,
  status2,
  status1,
  globalFeeds
}) => {
  return {
    articleLibrary,
    onArticleClick,
    tagRelatedArticles,
    currentTagName,
    userInfo,
    yourArticles,
    smallNavStatus,
    selfStatus,
    status3,
    status2,
    status1,
    globalFeeds
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onArticleClick: (title, slug) => dispatch(articleTitleClicked(title, slug)),
    onGlobeFeedClicked: () => dispatch(loadInitialData()),
    setNavStatus: (status1, status2, status3) =>
      dispatch(setNavStatus(status1, status2, status3)),
    onYourFeedClicked: token => dispatch(loadYourArticles()),

    onYourArticleNeeded: token => dispatch(loadYourArticles()),
    onFavoritedButtonClicked: (token, slug) =>
      dispatch(favoritedButtonClicked(token, slug))
  };
};

export const ArticlePreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticlePreview);
