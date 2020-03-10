import React from "react";

export const ArticleContent = props => {
  return (
    <div className='container page'>
    <div className='row article-content'>
      <div className='col-md-12 article-detail'>
        {props.currentArticleDetails.body}
      </div>
    </div>
    <hr />
  </div>
  );
};