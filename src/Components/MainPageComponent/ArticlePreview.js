import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import {
  articleTitleClicked,
  globeFeedClicked
} from "../../ReduxStore/FeedDetails/feedActions";

const InternalArticlePreview = props => {
  
  return (
    <div className='col-md-9 col-sm-12'>

      {/* Navigation */}
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active '>
          <li className='nav-item'>
            <a
              className='nav-link active display-inline'
              href='#top'
      
              // 这里
              onClick={() => {
                props.onGlobeFeedClicked();
              }}>
              Global Feed
            </a>
            {props.currentTagName && (
              <a className='nav-link active display-inline' href='#top'>
                # {props.currentTagName}
              </a>
            )}
          </li>
        </ul>
      </div>


      {/* Article */}
      {(props.tagRelatedArticles || props.articleLibrary).map(
        (article, index) => {
          return (
            <div className='article-preview' key={index}>
              
              <div className='article-meta'>

                <Link to= {'/user-profile/' + article.author.username}>
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

                <button className='btn btn-outline-primary btn-sm pull-xs-right'>
                  <i className='ion-heart'></i> {article.favoritesCount}
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
  onArticleClick: PropTypes.func
};

const mapStateToProps = ({
  articleLibrary,
  onArticleClick,
  tagRelatedArticles,
  currentTagName,
}) => {
  return {
    articleLibrary,
    onArticleClick,
    tagRelatedArticles,
    currentTagName,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onArticleClick: (title, slug) => dispatch(articleTitleClicked(title, slug)),
    onGlobeFeedClicked: () => dispatch(globeFeedClicked())
  };
};

export const ArticlePreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticlePreview);
