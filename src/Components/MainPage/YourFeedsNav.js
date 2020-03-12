import React from "react";
import { Link } from "react-router-dom";
import { displayLimit, offset } from "../../Functions/HttpClient";

export const YourFeedsNav = props => {
  let isExist ;
  if (props.navName === "Global Feed") ;

  let myStyle = "";
  if (props.navName === "Global Feed") {
    isExist = true;
    myStyle = props.favoriteNav;
  }
  if (props.navName === "Your Feed") {
    isExist = props.userInformation && props.userInformation.token;
    myStyle = props.yourNav;
  }

  return (
    <span>
      {isExist && (
        <Link
          onClick={() => {
            props.setLoading("LOADING");
            if (props.navName === "Your Feed") {
              props.setHomeNavStatus("active", "null", "null");
              props.loadYourFeedArticles(displayLimit, offset);
            }
            if (props.navName === "Global Feed") {
              props.setHomeNavStatus("null", "active", "null");
              props.loadGlobalFeeds(displayLimit, offset);
            }
          }}
          className={`nav-link display-inline ${myStyle} `}
          to='/home/your_feed'>
          {props.navName}
        </Link>
      )}
    </span>
  );
};
