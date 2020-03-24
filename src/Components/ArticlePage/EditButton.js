import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import PropTypes from "prop-types";

export const EditButton = props => {

  return (
    <Router>
    <div className='edit-button'>
      <Link to={`/new_post/${props.article_slug}`}>
        <button
          type='button'
          className='btn btn-sm btn-outline-secondary'
          onClick={() => props.onEditArticleClicked(false)}>
          Edit Article
        </button>
      </Link>

      <button
        className='btn btn-sm btn-outline-danger'
        onClick={() => props.onDeleteArticleClicked(props.article_slug)}>
        Delete Article
      </button>
    </div>
    </Router>
  );
};

EditButton.propTypes = {
  article_slug: PropTypes.string,
  onEditArticleClicked: PropTypes.func,
  onDeleteArticleClicked: PropTypes.func,
};