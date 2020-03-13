import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { displayLimit, offset } from "../../Functions/HttpClient";
import { FeedsToggle } from "../../Components/MainPage/FeedsToggle";
import { CurrentDisplayArticles } from "../../Components/ArticlePage/CurrentDisplayArticles";
import { PageTunner } from "../../Components/MainPage/PageTunner";
import {
  loadUserProfileDetail,
  setSignUpStatus
} from "../../ReduxStore/Actions/userActions";

import {
  loadGlobalFeeds,
  loadYourArticles,
  loadPopularTags,
  setDeleteArticleStatus,
  popularNavClean
} from "../../ReduxStore/Actions/articleActions";

import {
  favoritedButtonClicked,
  setHomeNavStatus,
  setLoading,
  updateSettingStatus,
  favoritedArticleNavClicked,
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
      props.loadYourFeedArticles(displayLimit, offset);
    } else {
      props.setHomeNavStatus("null", "active", "null");
      props.loadGlobalFeeds(displayLimit, offset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='col-md-9 col-sm-12'>
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active '>
          <li className='nav-item'>
            {/* ----------- NAVIGATION --------- */}
            <FeedsToggle
              onPage='Article Preview'
              userInformation={props.userInformation}
              setLoading={props.setLoading}
              popularNavClean={props.popularNavClean}
              loadYourFeedArticles={props.loadYourFeedArticles}
              setHomeNavStatus={props.setHomeNavStatus}
              yourNav={props.yourNav}
              globalNav={props.globalNav}
              popularNav={props.popularNav}
              currentTagName={props.currentTagName}
              loadGlobalFeeds={props.loadGlobalFeeds}
              onFavoritedArticleClicked={props.onFavoritedArticleClicked}
            />
          </li>
        </ul>
      </div>

      {/* ---------- CURRENT DISPLAY ARTICLES---------- */}
      <CurrentDisplayArticles
        pageName='Article Preview'
        userInformation={props.userInformation}
        currentDisplayArticle={props.currentHomeDisplayArticle}
        setLoading={props.setLoading}
        httpMethod={httpMethod}
        setHttpMethod={setHttpMethod}
        currentPageOffSet={currentPageOffSet}
        onFavoritedArticleClicked={props.onFavoritedArticleClicked}
      />

      {/* ------------------- PAGE TUNNER -------------- */}
      <PageTunner
        fromPage='ArticlePriview'
        articlesAllCount={props.articlesAllCount}
        setLoading={props.setLoading}
        globalNav={props.globalNav}
        loadGlobalFeeds={props.loadGlobalFeeds}
        loadPopularTags={props.loadPopularTags}
        setCurrentPageOffSet={setCurrentPageOffSet}
      />
    </div>
  );
};

InternalArticlePreview.propTypes = {
  userInformation: PropTypes.object,
  currentArticleDetails: PropTypes.object,
  currentHomeDisplayArticle: PropTypes.array.isRequired,
  currentTagName: PropTypes.string,
  popularNav: PropTypes.string.isRequired,
  yourNav: PropTypes.string.isRequired,
  globalNav: PropTypes.string,
  setLoading: PropTypes.func.isRequired,
  articlesAllCount: PropTypes.number
};

const mapStateToProps = ({ eventReducer, articleReducer, userReducer }) => {
  const { yourNav, globalNav, popularNav, loading } = eventReducer;

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
    globalNav,
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
    loadYourFeedArticles: (displayLimit, offset) =>
      dispatch(loadYourArticles(displayLimit, offset)),
    updateSettingStatus: status => dispatch(updateSettingStatus(status)),
// popularNavClean
popularNavClean: () => dispatch(popularNavClean()),

    onFavoritedArticleClicked: (token, slug, httpMethod, currentPageOffSet) =>
      dispatch(
        favoritedButtonClicked(token, slug, httpMethod, currentPageOffSet)
      ),
    loadGlobalFeeds: (displayLimit, offset) => {
      dispatch(loadGlobalFeeds(displayLimit, offset));
    },
    loadUserProfileDetail: (author_name, displayLimit, offset) =>
      dispatch(loadUserProfileDetail(author_name, displayLimit, offset)),
    setSignUpStatus: () => dispatch(setSignUpStatus()),
    setDeleteArticleStatus: status => dispatch(setDeleteArticleStatus(status)),
    loadPopularTags: () => {
      dispatch(loadPopularTags());
    },
    onFavoritedArticleNavClicked: (author_name, displayLimit, offset) =>
      dispatch(favoritedArticleNavClicked(author_name, displayLimit, offset))
  };
};

export const ArticlePreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticlePreview);
