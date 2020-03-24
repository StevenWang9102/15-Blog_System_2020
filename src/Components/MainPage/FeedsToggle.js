import React from "react";
import { FeedsNav } from "../../Components/MainPage/FeedsNav";

export const FeedsToggle = props => {
  let myRender = [];

  if (props.fromPage === "User Profile") myRender = ["My Articles", "Favorited Articles"];
  if (props.fromPage === "Article Preview") myRender = ["Your Feed", "Global Feed", "Popular Feed"];

  return (
    <div className='articles-toggle'>
      <ul className='nav nav-pills outline-active'>
        {myRender.map((feed, index) => {
            
          // User Profile Toggle
          if (props.fromPage === "User Profile") {
            return (
              <li className='nav-item' key={index}>
                <FeedsNav
                  navName={feed}
                  author_name={props.author_name}
                  setProfileNavStatus={props.setProfileNavStatus}
                  profileNavStatusLeft={props.profileNavStatusLeft}
                  profileNavStatusRight={props.profileNavStatusRight}
                  loadUserProfileDetail={props.loadUserProfileDetail}
                  onFavoritedArticleNavClicked={
                    props.onFavoritedArticleNavClicked
                  }
                />
              </li>
            );
          } else {
            // Article Preview Toggle 
            return (
                <li className='nav-item' key={index}>
                <FeedsNav
                  navName={feed}
                  userInformation={props.userInformation}
                  popularNavClean={props.popularNavClean}
                  loadYourFeedArticles={props.loadYourFeedArticles}
                  setHomeNavStatus={props.setHomeNavStatus}
                  yourNav={props.yourNav}
                  loadGlobalFeeds={props.loadGlobalFeeds}
                  globalNav={props.globalNav}
                  popularNav={props.popularNav}
                  currentTagName={props.currentTagName}
                  onFavoritedArticleClicked={props.onFavoritedArticleClicked}
                />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
