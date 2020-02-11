import React from "react";
// import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import {
  articleTitleClicked,
  globeFeedClicked,
  loadYourArticles,
  favoritedButtonClicked
} from "../../ReduxStore/FeedDetails/feedActions";


import {
  NavLink
} from "react-router-dom";

const InternalArticlePreview = props => {

  console.log(props.yourArticles);
  
  // CLOSED TEMPORARY
  // useEffect(() => {
  //   props.onYourArticleNeeded(props.userToken);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className='col-md-9 col-sm-12'>

      {/* --------------------- Navigation --------------------- */}
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active '>
          <li className='nav-item'>

            {sessionStorage.getItem('Token') && (
                <a
                  className='nav-link display-inline'  //active 
                  onClick={() => {
                    props.onYourFeedClicked(props.userToken);
                  }}>
                  Your Feed
                </a>
            )}
            
            <a
              className='nav-link display-inline'
              onClick={() => {
                props.onGlobeFeedClicked();
              }}>
              Global Feed
            </a>

            {props.currentTagName && (
              <NavLink exact={true} className='nav-link display-inline' activeClassName='active' to='/popular_tags'>
                # {props.currentTagName}
              </NavLink>
            )}
          </li>
        </ul>
      </div>


{/*   Confusing.... props.yourArticles */}

      {/* --------------------- Article --------------------- */}
      {(props.tagRelatedArticles || props.articleLibrary).map(
        (article, index) => {
          // console.log(article);
          
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
                  // 只能在存在登录状态才能传递这个函数，否则无意义
                  onClick={()=>{
                    const token = sessionStorage.getItem("Token")
                    console.log(token);
                    if(token) props.onFavoritedButtonClicked(token, article.slug)
                  }}
                >
                  <img src='./icon/002-heart-2.png' alt='love'/> 
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
  userToken: PropTypes.string,
};

const mapStateToProps = ({
  articleLibrary,
  onArticleClick,
  tagRelatedArticles,
  currentTagName,
  userToken,
  yourArticles
}) => {
  return {
    articleLibrary,
    onArticleClick,
    tagRelatedArticles,
    currentTagName,
    userToken,
    yourArticles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onArticleClick: (title, slug) => dispatch(articleTitleClicked(title, slug)),
    onGlobeFeedClicked: () => dispatch(globeFeedClicked()),
    onYourFeedClicked: (token) => dispatch(loadYourArticles(token)),
    onFavoritedButtonClicked: (token, slug) => dispatch(favoritedButtonClicked(token, slug)),
  };
};

export const ArticlePreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticlePreview);
