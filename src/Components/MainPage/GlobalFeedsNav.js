import React from "react";
import { Link } from "react-router-dom";
import { displayLimit, offset } from "../../Functions/HttpClient";

export const GlobalFeedsNav = props => {
  return (
    <Link
      // onClick={() => {
      //   props.setLoading("LOADING");
      //   props.setHomeNavStatus("null", "active", "null");
      //   props.loadGlobalFeeds(displayLimit, offset);
      // }}
      // className={`nav-link ${props.favoriteNav} display-inline`}
      to='/home/global_feed'>
      Global Feed
    </Link>
  );
};
