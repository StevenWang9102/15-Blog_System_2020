import React from "react";
import { Link } from "react-router-dom";
import { displayLimit, offset } from "../../Functions/HttpClient";

export const FeedsNav = props => {
  let isExist;
  let myStyle,
    url,
    navName = "";

  if (props.navName === "Global Feed") {
    navName = "Global Feed";
    isExist = true;
    myStyle = props.globalNav;
    url = "/home/global_feed";
  }
  if (props.navName === "Your Feed") {
    navName = "Your Feed";
    isExist = props.userInformation && props.userInformation.token;
    myStyle = props.yourNav;
    url = "/home/your_feed";
  }
  if (props.navName === "Popular Feed") {
    navName = `# ${props.currentTagName}`;
    isExist = props.currentTagName;
    myStyle = props.popularNav;
    url = "/home/popular_tags";
  }
  // navName='My Articles'
  // renderArray = ["My Articles", "Favorited Articles"];

  if (props.navName === "My Articles") {
    navName = "My Articles";
    isExist = true;
    myStyle = props.profileNavStatusLeft;
    url = `/user_profile/${props.author_name}/my_articles`;
  }

   // navName='Favorited Articles'
   if (props.navName === "Favorited Articles") {
    navName = "Favorited Articles";
    isExist = true;
    myStyle = props.profileNavStatusRight;
    url = `/user_profile/${props.author_name}/favorited_articles`;
  }
  return (
    <span>
      {isExist && (
        <Link
          onClick={() => {
            props.setLoading("LOADING");
            if (navName === "Your Feed") {
              props.setHomeNavStatus("active", "null", "null");
              props.loadYourFeedArticles(displayLimit, offset);
            }
            if (navName === "Global Feed") {
              props.setHomeNavStatus("null", "active", "null");
              props.loadGlobalFeeds(displayLimit, offset);
            }
            //
            if (navName === "My Articles") {
              console.log("进来了");
              
              props.setProfileNavStatus("active", "null");
              props.loadUserProfileDetail(
                props.author_name,
                displayLimit,
                offset
              );
            }
            // 
            if (navName === "Favorited Articles") {
              props.setProfileNavStatus("null", "active");
              props.onFavoritedArticleNavClicked(
                props.author_name,
                displayLimit,
                offset
              );
            }
          }}
          className={`nav-link display-inline ${myStyle} `}
          to={url}>
          {navName}
        </Link>
      )}
    </span>
  );
};
