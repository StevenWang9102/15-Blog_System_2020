import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { articleCountDisplay, articleOffSet } from "../../Functions/httpMethods"
import { YourFeedsNav } from "../../Componnets/MainPage/YourFeedsNav"

import { GlobalFeedsNav } from "../../Componnets/MainPage/GlobalFeedsNav"

import { PopularTagsNav } from "../../Componnets/MainPage/PopularTagsNav"

import {
  loadGlobalFeeds,
  loadYourArticles,
  loadPopularTags,
} from "../../ReduxStore/Actions/articleActions";

import {
  favoritedButtonClicked,
  setHomeNavStatus,
  setLoading,
  emptyArticleCount,
  updateSettingStatus
} from "../../ReduxStore/Actions/eventActions";

const useStyles = createUseStyles({
  myButton: {
      border: '0px',
      padding: '0px',
  },
  '& a': {
      height: '5px',
      width: '5px',
  }
});

const InternalArticlePreview = props => {

  const Page = ({ children }) => {
    const classes = useStyles();
    return (
      <button
        className={`page-item ${classes.myButton}`}>
        {children}
      </button>
    );
  };

  const [httpMethod, setHttpMethod] = useState({});
  const pageNumber = Math.round(props.articleCount / articleCountDisplay)

  const myPageNumArray = [];
  for (let i = 1; i <= pageNumber; i++) {
    myPageNumArray.push(i)
  }

  useEffect(() => {
    props.setLoading("LOADING")
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

              <Link to={"/user_profile/" + article.author.username}>
                <img
                  className='author-image'
                  src={article.author.image}
                  alt='au'
                />

                <div 
                  className='info author'
                  onClick={()=> {
                    props.setLoading("LOADING")
                    props.emptyArticleCount()
                  } }
                  >
                  {article.author.username}
                  <span className='date'>
                    {dateFormat(article.updatedAt, "ddd mmm dd yyyy")}
                  </span>
                </div>
              </Link>

              <button
                type='button'
                className= "btn btn-outline-primary btn-sm pull-xs-right"
                onClick={() => {
                  props.setLoading("LOADING")
                  // Switch method between "POST" and "DELETE"
                  const tempMethod = { ...httpMethod };
                  if (tempMethod[article.slug] === "POST") {
                    tempMethod[article.slug] = "DELETE";
                  } else {
                    tempMethod[article.slug] = "POST";
                  }
                  const token = props.userInformation.token;
                  token &&
                    props.onFavoritedArticleClicked(
                      token,
                      article.slug,
                      tempMethod[article.slug]
                    );
                  setHttpMethod(tempMethod);
                }}>
                <img src='../icon/002-heart-2.png' alt='' />
                {article.favoritesCount}
              </button>
            </div>

            <Link
              className='nav-link preview-link article-detail'
              onClick={()=> props.setLoading("LOADING")}
              to={"/article-detail/" + article.slug}>
              <h1>
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

      {/* --------- Page Tunner -------- */}
      <nav>
        <ul class="pagination">
          {myPageNumArray.map((pageNumber, index) => {
            const articleOffSet = index * articleCountDisplay
            return (<Page>
              <a 
                class="page-link" 
                href={`#p${pageNumber}`}
                onClick={()=>{
                  props.setLoading("LOADING")
                  if(props.favoriteNav==="active")
                    props.loadGlobalFeeds(articleCountDisplay, articleOffSet)
                  else if(props.yourNav==="active")
                    props.loadYourFeedArticles(articleCountDisplay, articleOffSet)
                  else
                  props.loadPopularTags()
                }}
                > {pageNumber} </a>
            </Page>)
          })}
        </ul>
      </nav>
    </div>
  );
};

InternalArticlePreview.propTypes = {
  currentTagName: PropTypes.string,
  globalArticles: PropTypes.array.isRequired,
};

const mapStateToProps = ({ eventReducer, articleReducer, userReducer }) => {
  const {
    yourNav,
    favoriteNav,
    popularNav,
    loading,
    articleCount,
  } = eventReducer;

  const {
    currentTagName,
    globalArticles,
    currentHomeDisplayArticle,
  } = articleReducer;

  const {
    userInformation,
  } = userReducer;

  return {
    globalArticles,
    userInformation,
    currentTagName,
    yourNav,
    favoriteNav,
    popularNav,
    currentHomeDisplayArticle,
    articleCount,
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: (status) => dispatch(setLoading(status)),
    setHomeNavStatus: (your, favorite, popular) => dispatch(setHomeNavStatus(your, favorite, popular)),
    loadYourFeedArticles: (articleCountDisplay, articleOffSet) => dispatch(loadYourArticles(articleCountDisplay, articleOffSet)),
    updateSettingStatus: status => dispatch(updateSettingStatus(status)),
    onFavoritedArticleClicked: (token, slug, httpMethod) =>
      dispatch(favoritedButtonClicked(token, slug, httpMethod)),
    loadGlobalFeeds: (articleCountDisplay, articleOffSet) => {
      dispatch(loadGlobalFeeds(articleCountDisplay, articleOffSet));
    },
    emptyArticleCount: () => dispatch(emptyArticleCount()),
    loadPopularTags: () => { dispatch(loadPopularTags());
    }
  };
};

export const ArticlePreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticlePreview);
