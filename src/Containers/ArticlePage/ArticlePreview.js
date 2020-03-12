import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  articleCountDisplay,
  offset
} from "../../Functions/HttpClient";
import { YourFeedsNav } from "../../Components/MainPage/YourFeedsNav";
import { GlobalFeedsNav } from "../../Components/MainPage/GlobalFeedsNav";
import { ArticleTitle } from "../../Components/ArticlePage/ArticleTitle";
import { ArticleDesctiption } from "../../Components/MainPage/ArticleDesctiption";
import { PageTunner } from "../../Components/MainPage/PageTunner";
import { PopularTagsNav } from "../../Components/MainPage/PopularTagsNav";
import { FavoritedButton } from "../../Components/MainPage/FavoritedButton";
import {loadUserProfileDetail, setSignUpStatus} from "../../ReduxStore/Actions/userActions";

import {
  loadGlobalFeeds,
  loadYourArticles,
  loadPopularTags,
  setDeleteArticleStatus
} from "../../ReduxStore/Actions/articleActions";

import {
  favoritedButtonClicked,
  setHomeNavStatus,
  setLoading,
  updateSettingStatus,
  favoritedArticleNavClicked
} from "../../ReduxStore/Actions/eventActions";


const InternalArticlePreview = props => {
  const [httpMethod, setHttpMethod] = useState({});
  const [currentPageOffSet, setCurrentPageOffSet] = useState(0);


  useEffect(() => {
    props.setLoading("LOADING");
    props.updateSettingStatus("NOT UPDATED");
    props.setDeleteArticleStatus("NOT DELETED");
    props.setSignUpStatus("NOT LOADED");
    props.loadPopularTags();

    if (props.userInformation && props.userInformation.username) {
      props.setHomeNavStatus("active", "null", "null");
      props.loadYourFeedArticles(articleCountDisplay, offset);
    } else {
      props.setHomeNavStatus("null", "active", "null");
      props.loadGlobalFeeds(articleCountDisplay, offset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='col-md-9 col-sm-12'>
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active '>
          <li className='nav-item'>
            {/* ----------- NAVIGATION --------- */}
            <YourFeedsNav
              userInformation={props.userInformation}
              setLoading={props.setLoading}
              loadYourFeedArticles={props.loadYourFeedArticles}
              setHomeNavStatus={props.setHomeNavStatus}
              yourNav={props.yourNav}
            />

            <GlobalFeedsNav
              setLoading={props.setLoading}
              setHomeNavStatus={props.setHomeNavStatus}
              loadGlobalFeeds={props.loadGlobalFeeds}
              favoriteNav={props.favoriteNav}
            />

            <PopularTagsNav
              popularNav={props.popularNav}
              currentTagName={props.currentTagName}
            />
          </li>
        </ul>
      </div>

      {/* ---------- CURRENT DISPLAY ARTICLES---------- */}
      {props.currentHomeDisplayArticle.map((article, index) => {
        return (
          <div className='article-preview' key={index}>
            <div className='article-meta'>

              <ArticleTitle
                currentArticleDetails={article}
                setLoading={props.setLoading}
              />

              <FavoritedButton
                httpMethod={httpMethod}
                setHttpMethod={setHttpMethod}
                article={article}
                userInformation={props.userInformation}
                setLoading={props.setLoading}
                currentPageOffSet={currentPageOffSet}
                onFavoritedArticleClicked={props.onFavoritedArticleClicked}
              />
            </div>

            <ArticleDesctiption
              setLoading={props.setLoading}
              article={article}
            />
          </div>
        );
      })}

      {props.currentHomeDisplayArticle.length === 0 && (
        <div className='article-preview'>No articles are here... yet.</div>
      )}

      {/* ------------------- PAGE TUNNER -------------- */}
      <PageTunner
        fromPage='ArticlePriview'
        articlesAllCount={props.articlesAllCount}
        setLoading={props.setLoading}
        favoriteNav={props.favoriteNav}
        loadGlobalFeeds={props.loadGlobalFeeds}
        loadPopularTags={props.loadPopularTags}
        setCurrentPageOffSet={setCurrentPageOffSet}
      />
    </div>
  );
};

InternalArticlePreview.propTypes = {
  userInformation: PropTypes.object,
  currentArticleDetails:PropTypes.object,
  currentHomeDisplayArticle:PropTypes.array.isRequired,
  currentTagName: PropTypes.string,
  popularNav: PropTypes.string.isRequired,
  yourNav: PropTypes.string.isRequired,
  favoriteNav: PropTypes.string,
  setLoading: PropTypes.func.isRequired,
  articlesAllCount:PropTypes.number,
};

const mapStateToProps = ({ eventReducer, articleReducer, userReducer }) => {
  const { yourNav, favoriteNav, popularNav, loading } = eventReducer;

  const {
    currentTagName,
    currentHomeDisplayArticle,
    articlesAllCount
  } = articleReducer;

  const { userInformation } = userReducer;

  return {
    userInformation,
    currentTagName,
    yourNav,
    favoriteNav,
    popularNav,
    currentHomeDisplayArticle,
    articlesAllCount,
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: status => dispatch(setLoading(status)),
    setHomeNavStatus: (your, favorite, popular) =>
      dispatch(setHomeNavStatus(your, favorite, popular)),
    loadYourFeedArticles: (articleCountDisplay, offset) =>
      dispatch(loadYourArticles(articleCountDisplay, offset)),
    updateSettingStatus: status => dispatch(updateSettingStatus(status)),
    onFavoritedArticleClicked: (token, slug, httpMethod, currentPageOffSet, name) =>
      dispatch(favoritedButtonClicked(token, slug, httpMethod, currentPageOffSet, name)),
    loadGlobalFeeds: (articleCountDisplay, offset) => {
      dispatch(loadGlobalFeeds(articleCountDisplay, offset));
    },
    loadUserProfileDetail: (author_name, articleCountDisplay, offset) =>
    dispatch(
      loadUserProfileDetail(author_name, articleCountDisplay, offset)
    ),
    setSignUpStatus: () => dispatch(setSignUpStatus()),
    setDeleteArticleStatus: status =>dispatch(setDeleteArticleStatus(status)),
    loadPopularTags: () => {dispatch(loadPopularTags())},
    onFavoritedArticleNavClicked: (author_name, articleCountDisplay, offset) =>
      dispatch(favoritedArticleNavClicked(author_name, articleCountDisplay, offset)),
  };
};

export const ArticlePreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticlePreview);
