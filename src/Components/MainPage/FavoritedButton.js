import React from "react";

export const FavoritedButton = props => {

  return (
    <button
      type='button'
      className='btn btn-outline-primary btn-sm pull-xs-right'
      onClick={() => {
        props.setLoading("LOADING");

        // Switch method between "POST" and "DELETE"
        const tempMethod = { ...props.httpMethod };
        if (tempMethod[props.article.slug] === "POST") {
          tempMethod[props.article.slug] = "DELETE";
        } else {
          tempMethod[props.article.slug] = "POST";
        }

        props.userInformation.token &&
          props.onFavoritedArticleClicked(
            props.userInformation.token,
            props.article.slug,
            tempMethod[props.article.slug]
          );
          props.setHttpMethod(tempMethod);
      }}>
      <img src='../icon/002-heart-2.png' alt='' />
      {props.article.favoritesCount}
    </button>
  );
};
