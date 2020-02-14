import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import {
  articleTitleClicked,
  globeFeedClicked,
  loadYourArticles,
  favoritedButtonClicked,
  smallNavClicked,
  yourFeedNavClicked,
} from "../../ReduxStore/FeedDetails/feedActions";
import { NavLink } from "react-router-dom";

const InternalArticlePreview = props => {
  
  useEffect(() => {
    if (props.userInfo.token) props.onYourArticleNeeded(props.userInfo.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <div className='col-md-9 col-sm-12'>

      {/* --------------------- Navigation --------------------- */}
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active '>
          <li className='nav-item'>

            {/* ----------- Your Feed --------- */}
            {sessionStorage.getItem("Token") && (
              <NavLink
              onClick={() => {
                props.onYourFeedClicked(props.userInfo.token);
                props.onSmallNavClicked('null')
                props.onYourFeedNavClicked('active')
              }}
              className='nav-link display-inline'
              activeClassName = {props.selfStatus}
              to='/home#your_feed'
              >
              Your Feed
              </NavLink>
            )}

            {/* ----------- Global Feed --------- */}
            <NavLink
              onClick={() => {
                props.onGlobeFeedClicked();
                props.onSmallNavClicked('active')
                props.onYourFeedNavClicked('null')
              }}
              className='nav-link display-inline'
              activeClassName = {props.smallNavStatus}
              to='/home#global_feed'
              >
              Global Feed
            </NavLink>

            {/* ----------- Popular Tags --------- */}
            {props.currentTagName && (
              <NavLink
                className='nav-link display-inline'
                activeClassName='active'
                to='/home#popular_tags'
                >
                # {props.currentTagName}
              </NavLink>
            )}
          </li>
        </ul>
      </div>

      {/*   Confusing.... how to add props.yourArticles bellow */}
      {/*   Confusing.... how to add props.yourArticles bellow */}

      {/* --------------------- Article --------------------- */}
      {(props.tagRelatedArticles || props.articleLibrary).map(
        (article, index) => {
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
                    const token = sessionStorage.getItem("Token");
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
  selfStatus
}) => {
  return {
    articleLibrary,
    onArticleClick,
    tagRelatedArticles,
    currentTagName,
    userInfo,
    yourArticles,
    smallNavStatus,
    selfStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onArticleClick: (title, slug) => dispatch(articleTitleClicked(title, slug)),
    onGlobeFeedClicked: () => dispatch(globeFeedClicked()),
    onYourFeedClicked: token => dispatch(loadYourArticles(token)),
    onYourArticleNeeded: token => dispatch(loadYourArticles(token)),
    onFavoritedButtonClicked: (token, slug) => dispatch(favoritedButtonClicked(token, slug)),
    onSmallNavClicked: (status) => dispatch(smallNavClicked(status)),
    onYourFeedNavClicked: (self) => dispatch(yourFeedNavClicked(self)),
  };
};

export const ArticlePreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticlePreview);
