import React from "react";
import { Link } from "react-router-dom";

export const PopularTagsNav = props => {
  return (
    <span>
      {props.currentTagName && (
        <Link
          className={`nav-link ${props.popularNav} display-inline `}
          to='/home/popular_tags'>
          # {props.currentTagName}
        </Link>
      )}
    </span>
  );
};
