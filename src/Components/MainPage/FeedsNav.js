import React from "react";
import { Link } from "react-router-dom";
import { displayLimit, offset } from "../../ReduxStore/HttpClient";

export const FeedsNav = props => {
  let isExist;
  let myStyle,
    url,
    navDisplayName = "";

  // Global Feed Nav Config
  if (props.navName === "Global Feed") {
    navDisplayName = "Global Feed";
    isExist = true;
    myStyle = props.globalNav;
    url = "/home/global_feed";
  }

  // Your Feed Nav Config
  if (props.navName === "Your Feed") {
    navDisplayName = "Your Feed";
    isExist = props.userInformation && props.userInformation.token;
    myStyle = props.yourNav;
    url = "/home/your_feed";
  }

  // Popular Feed Nav Config
  if (props.navName === "Popular Feed") {
    navDisplayName = `# ${props.currentTagName}`;
    isExist = props.currentTagName;
    myStyle = props.popularNav;
    url = "/home/popular_tags";
  }

  // My Articles Nav Config
  if (props.navName === "My Articles") {
    navDisplayName = "My Articles";
    isExist = true;
    myStyle = props.profileNavStatusLeft;
    url = `/user_profile/${props.author_name}/my_articles`;
  }

  // Favorited Articles Nav Config
  if (props.navName === "Favorited Articles") {
    navDisplayName = "Favorited Articles";
    isExist = true;
    myStyle = props.profileNavStatusRight;
    url = `/user_profile/${props.author_name}/favorited_articles`;
  }
  return (
    <span>
      {isExist && (
        <Link
          onClick={() => {
            // Your Feed Click
            if (props.navName === "Your Feed") {
              props.setHomeNavStatus("active", "null", "null");
              props.loadYourFeedArticles(displayLimit, offset);
            }

            // Global Feed Click
            if (props.navName === "Global Feed") {
              props.setHomeNavStatus("null", "active", "null");
              props.loadGlobalFeeds(displayLimit, offset);
            }

            // Popular Tag Click
            if (props.navName === "Popular Feed") {
              props.setHomeNavStatus("null", "active", "null");
              props.popularNavClean();
            }

            // My Article Click
            if (props.navName === "My Articles") {
              props.setProfileNavStatus("active", "null");
              props.loadUserProfileDetail(
                props.author_name,
                displayLimit,
                offset
              );
            }

            // Favorited Articles Click
            if (props.navName === "Favorited Articles") {
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
          {navDisplayName}
        </Link>
      )}
    </span>
  );
};
