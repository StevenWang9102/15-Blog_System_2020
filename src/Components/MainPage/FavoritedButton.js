import React from "react";
import { useState } from "react";

export const FavoritedButton = props => {

  const [favoritesCountPlus, setFavoritesCountPlus] = useState(0);
  // const [color, setColor] = useState("nothing");
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
            tempMethod[props.article.slug],
            props.currentPageOffSet,
            props.author_name
          );
        setFavoritesCountPlus(tempMethod[props.article.slug]==="POST"? 1:0) 
        // setColor(tempMethod[props.article.slug]==="POST"? "Clicked":"notho")
        props.setHttpMethod(tempMethod);
      }}>
      <img src='../icon/002-heart-2.png' alt='' />
      {props.article.favoritesCount + favoritesCountPlus}
    </button>
  );
};
