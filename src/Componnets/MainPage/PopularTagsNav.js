import React from "react";
import { Link } from "react-router-dom";


export const PopularTagsNav = props => {
  const isDisplay = props.currentTagName;
  
  return (
    <span>
      {isDisplay && (
        <Link
          className={`nav-link ${props.popularNav} display-inline `}
          to='/home/popular_tags'>
          # {props.currentTagName}
        </Link>
      )}
    </span>
  );
};
