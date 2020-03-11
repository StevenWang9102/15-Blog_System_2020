import React from "react";
import { Link } from "react-router-dom";
import {
  articleCountDisplay,
  articleOffSet
} from "../../Functions/httpMethods";

export const YourFeedsNav = props => {
  
  return (
    <span>
      {props.userInformation && props.userInformation.token && (
        <Link
          onClick={() => {
            props.setLoading("LOADING");
            props.loadYourFeedArticles(articleCountDisplay, articleOffSet);
            props.setHomeNavStatus("active", "null", "null");
          }}
          className={`nav-link display-inline ${props.yourNav} `}
          to='/home/your_feed'>
          Your Feed
        </Link>
      )}
    </span>
  );
};