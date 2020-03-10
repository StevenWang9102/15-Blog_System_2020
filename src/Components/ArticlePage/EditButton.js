import React from "react";
import { Link } from "react-router-dom";

export const EditButton = props => {
  return (
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
  );
};
