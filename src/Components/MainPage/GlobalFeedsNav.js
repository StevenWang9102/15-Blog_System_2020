import React from "react";
import { Link } from "react-router-dom";
import {
  articleCountDisplay,
  articleOffSet
} from "../../Functions/httpMethods";

export const GlobalFeedsNav = props => {
  return (
    <Link
      onClick={() => {
        props.setLoading("LOADING");
        props.setHomeNavStatus("null", "active", "null");
        props.loadGlobalFeeds(articleCountDisplay, articleOffSet);
      }}
      className={`nav-link ${props.favoriteNav} display-inline`}
      to='/home/global_feed'>
      Global Feed
    </Link>
  );
};
