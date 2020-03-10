import React from "react";
import { Link } from "react-router-dom";

export const ArticleDesctiption = props => {
  return (
    <Link
      className='nav-link preview-link article-detail'
      onClick={() => props.setLoading("LOADING")}
      to={"/article-detail/" + props.article.slug}>
      <h1>{props.article.title}</h1>
      <p>{props.article.description}</p>
      <span>Read more...</span>
    </Link>
  );
};
