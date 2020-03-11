import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  articleCountDisplay,
  articleOffSet
} from "../../Functions/httpMethods";
import { YourFeedsNav } from "../../Components/MainPage/YourFeedsNav";
import { GlobalFeedsNav } from "../../Components/MainPage/GlobalFeedsNav";
import { ArticleTitle } from "../../Components/ArticlePage/ArticleTitle";
import { ArticleDesctiption } from "../../Components/MainPage/ArticleDesctiption";
import { PageTunner } from "../../Components/MainPage/PageTunner";
import { PopularTagsNav } from "../../Components/MainPage/PopularTagsNav";
import { FavoritedButton } from "../../Components/MainPage/FavoritedButton";

import {
  loadGlobalFeeds,
  loadYourArticles,
  loadPopularTags
} from "../../ReduxStore/Actions/articleActions";

import {
  favoritedButtonClicked,
  setHomeNavStatus,
  setLoading,
  emptyArticleCount,
  updateSettingStatus
} from "../../ReduxStore/Actions/eventActions";

const InternalArticlePreview = props => {
  const [httpMethod, setHttpMethod] = useState({});
  const [currentPageOffSet, setCurrentPageOffSet] = useState(0);


  useEffect(() => {
    props.setLoading("LOADING");
    props.updateSettingStatus("NOT UPDATED");
    props.loadPopularTags();

    if (props.userInformation.username) {
      props.setHomeNavStatus("active", "null", "null");
      props.loadYourFeedArticles(articleCountDisplay, articleOffSet);
    } else {
      props.setHomeNavStatus("null", "active", "null");
      props.loadGlobalFeeds(articleCountDisplay, articleOffSet);
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
                emptyArticleCount={props.emptyArticleCount}
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
  currentArticleDetails:PropTypes.object.isRequired,
  currentHomeDisplayArticle:PropTypes.object.isRequired,
  currentTagName: PropTypes.string,
  popularNav: PropTypes.array.isRequired,
  yourNav: PropTypes.array.isRequired,
  favoriteNav: PropTypes.array.isRequired,
  setLoading: PropTypes.func.isRequired,
  articlesAllCount:PropTypes.number.isRequired,
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
    loadYourFeedArticles: (articleCountDisplay, articleOffSet) =>
      dispatch(loadYourArticles(articleCountDisplay, articleOffSet)),
    updateSettingStatus: status => dispatch(updateSettingStatus(status)),
    onFavoritedArticleClicked: (token, slug, httpMethod) =>
      dispatch(favoritedButtonClicked(token, slug, httpMethod)),
    loadGlobalFeeds: (articleCountDisplay, articleOffSet) => {
      dispatch(loadGlobalFeeds(articleCountDisplay, articleOffSet));
    },
    emptyArticleCount: () => dispatch(emptyArticleCount()),
    loadPopularTags: () => {
      dispatch(loadPopularTags());
    }
  };
};

export const ArticlePreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticlePreview);
