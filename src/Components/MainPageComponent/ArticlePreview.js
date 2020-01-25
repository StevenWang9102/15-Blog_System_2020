import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { articleTitleClicked } from "../../ReduxStore/FeedDetails/feedActions";

const InternalArticlePreview = props => {
  // 给一个标志: 只要props.tagRelatedArticles 不为空
  // if 点击popular tags
  // else 普通的
  return (
    <div className="col-md-9 col-sm-12">
      <div className="feed-toggle display-inline">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <a className="nav-link active" href="#top">
              Global Feed
            </a>
          </li>
        </ul>
      </div>
      
      {props.tagRelatedArticles && (
        <div className="feed-toggle display-inline">
          <ul className="nav nav-pills outline-active">
            <li className="nav-item">
              <a className="nav-link active" href="#top">
                # test
              </a>
            </li>
          </ul>
        </div>
      )}

      {props.articleLibrary.map((article, index) => {
        return (
          <div className="article-preview" key={index}>
            <div className="article-meta">
              <a href="profile.html">
                <img
                  className="author-image"
                  src={article.author.image}
                  alt=""
                />
              </a>
              <div className="info">
                <a href="#top" className="author">
                  {article.author.username}
                </a>
                <span className="date">
                  {dateFormat(article.updatedAt, "ddd mmm dd yyyy")}
                </span>
              </div>
              <button className="btn btn-outline-primary btn-sm pull-xs-right">
                <i className="ion-heart"></i> {article.favoritesCount}
              </button>
            </div>

            <Link
              className="nav-link preview-link article-detail"
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
  isDisplay
}) => {
  return { articleLibrary, onArticleClick, tagRelatedArticles, isDisplay };
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
