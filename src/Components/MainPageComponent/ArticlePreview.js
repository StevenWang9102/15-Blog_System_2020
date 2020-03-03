import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import {
  articleTitleClicked,
  loadGlobalFeeds,
  loadYourArticles,
  favoritedButtonClicked,
  setHomeNavStatus,
  loadPopularTags,
  updateSettingStatus
} from "../../ReduxStore/FeedDetails/feedActions";
// import { NavLink } from "react-router-dom";


const InternalArticlePreview = props => {
  const useStyles = createUseStyles({
    myButton: {
        border: '0px',
        padding: '0px',
        // borderRadius:'5px'
    },
    '& a': {
        height: '5px',
        width: '5px',
    }
  });
  
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
  const articleCountDisplay = 10
  const articleOffSet = 0
  const pageNumber = Math.round(props.articleCount / articleCountDisplay)

  const myPageNumArray = []
  for (let i = 1; i <= pageNumber; i++) {
    myPageNumArray.push(i)
  }
  console.log(myPageNumArray);


  useEffect(() => {
    props.updateSettingStatus("not updated");
    if (props.userInformation.username) {
      props.setHomeNavStatus("active", "null", "null");
      props.loadPopularTags();
      props.loadYourFeedArticles();
    } else {
      props.setHomeNavStatus("active", "active", "null");
      props.loadPopularTags();
      props.loadGlobalFeeds(articleCountDisplay, articleOffSet);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  console.log(props.articleCount, pageNumber);

  return (
    <div className='col-md-9 col-sm-12'>
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active '>
          <li className='nav-item'>

            {/* ------------------ Your Feed ----------------- */}
            {props.userInformation && props.userInformation.token && (
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
                props.loadGlobalFeeds(articleCountDisplay, articleOffSet);
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

      {/* --------------------- Page Tunner --------------------- */}
      <nav>
        <ul class="pagination">

          {myPageNumArray.map((pageNumber, index) => {
            const articleOffSet = index * articleCountDisplay
            return (<Page>
              <a 
                class="page-link" 
                href="#"
                onClick={()=>{props.loadGlobalFeeds(articleCountDisplay, articleOffSet)}}
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
  tagRelatedArticles: PropTypes.array,
  globalArticles: PropTypes.array.isRequired,
  onArticleClick: PropTypes.func
};

const mapStateToProps = ({ syncReducer, asyncReducer }) => {
  const {
    tagRelatedArticles,
    currentTagName,
    yourNav,
    favoriteNav,
    popularNav,
  } = syncReducer;

  const {
    userInformation,
    globalArticles,
    onArticleClick,
    currentHomeDisplayArticle,
    articleCount
  } = asyncReducer;

  return {
    globalArticles,
    onArticleClick,
    tagRelatedArticles,
    userInformation,
    currentTagName,
    yourNav,
    favoriteNav,
    popularNav,
    currentHomeDisplayArticle,
    articleCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onArticleClick: (title, slug) => dispatch(articleTitleClicked(title, slug)),
    // loadGlobalFeeds: () => dispatch(loadGlobalFeeds()),
    setHomeNavStatus: (your, favorite, popular) => dispatch(setHomeNavStatus(your, favorite, popular)),
    onYourFeedClicked: () => dispatch(loadYourArticles()),
    loadYourFeedArticles: () => dispatch(loadYourArticles()),
    updateSettingStatus: status => dispatch(updateSettingStatus(status)),
    onFavoritedButtonClicked: (token, slug, httpMethod) =>
      dispatch(favoritedButtonClicked(token, slug, httpMethod)),
    loadGlobalFeeds: (articleCountDisplay, articleOffSet) => {
      dispatch(loadGlobalFeeds(articleCountDisplay, articleOffSet));
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
