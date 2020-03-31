import React from "react";
import { useState } from "react";
import { createUseStyles } from "react-jss";
import PropTypes from "prop-types";

const useStyles = createUseStyles({
  myButton: {
    textAlign: "left",
    marginLeft: "10px",
    "&:hover": {
      color: "white",
      fontWeight: "500",
      textAlign: "center",
      backgroundColor: " #5cb85c94"
    },
    "&:focus": {
      color: "#5cb85c",
      fontWeight: "500",
      textAlign: "center",
      backgroundColor: "#5cb85c11"
    }
  }
});

export const FavoritedButton = props => {
  const [favoritesCountPlus, setFavoritesCountPlus] = useState(0);
  const Button = ({ children }) => {
    const classes = useStyles();
    return (
      <button
        type='button'
        className={`btn btn-outline-primary btn-sm pull-xs-right ${classes.myButton}`}
        onClick={() => {
          
          // Switch method between "POST" and "DELETE"
          if (props.userInformation.token) {
            const tempMethod = { ...props.httpMethod };

            if (tempMethod[props.article.slug] === "POST") {
              tempMethod[props.article.slug] = "DELETE";
            } else {
              tempMethod[props.article.slug] = "POST";
            }

            props.onFavoritedArticleClicked(
              props.userInformation.token,
              props.article.slug,
              tempMethod[props.article.slug],
              props.currentPageOffSet,
            );
            props.setHttpMethod(tempMethod);

            // Display add 1 or not
            setFavoritesCountPlus(
              tempMethod[props.article.slug] === "POST" ? 1 : 0
            );
          }
        }}>
        {children}
      </button>
    );
  };

  return (
    <Button>
      <img src='../icon/002-heart-2.png' alt='' />
      {props.article.favoritesCount + favoritesCountPlus}
    </Button>
  );
};


FavoritedButton.propTypes = {
  userInformation: PropTypes.object,
  article: PropTypes.object,
  onFavoritedArticleClicked: PropTypes.func,
  setHttpMethod: PropTypes.func,
};