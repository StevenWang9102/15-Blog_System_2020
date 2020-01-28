import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { articleTitleClicked } from "../../ReduxStore/FeedDetails/feedActions";

const InternalArticlePreview = props => {

  console.log(props.tagRelatedArticles);
  console.log(props.currentTagName);

  return (
    <div className='col-md-9 col-sm-12'>
      <div className='feed-toggle'>
        <ul className='nav nav-pills outline-active '>
          <li
            className='nav-item'
            // 点击之后，props.currentTagName 设置为 空对象
            // onClick =
          >
            <a className='nav-link active display-inline' href='#top'>
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

      {(props.tagRelatedArticles || props.articleLibrary).map((article, index) => {
        return (
          <div className='article-preview' key={index}>
            <div className='article-meta'>
              <a href='profile.html'>
                <img
                  className='author-image'
                  src={article.author.image}
                  alt=''
                />
              </a>
              <div className='info'>
                <a href='#top' className='author'>
                  {article.author.username}
                </a>
                <span className='date'>
                  {dateFormat(article.updatedAt, "ddd mmm dd yyyy")}
                </span>
              </div>
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
      })}
    </div>
  );
};

InternalArticlePreview.propTypes = {
  articleLibrary: PropTypes.array.isRequired,
  onArticleClick: PropTypes.func
};

const mapStateToProps = ({
  articleLibrary,
  onArticleClick,
  tagRelatedArticles,
  currentTagName,
  isDisplay
}) => {
  return {
    articleLibrary,
    onArticleClick,
    tagRelatedArticles,
    currentTagName,
    isDisplay
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onArticleClick: (title, slug) => dispatch(articleTitleClicked(title, slug))
  };
};

export const ArticlePreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticlePreview);
