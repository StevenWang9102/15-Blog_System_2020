import React from "react";
// import { Link } from "react-router-dom";
// import { displayLimit, offset } from "../../Functions/HttpClient";
import { FeedsNav } from "../../Components/MainPage/FeedsNav";

export const FeedsToggle = props => {
let renderArray =[]
if(props.onPage === "User Profile") renderArray = ["My Articles", "Favorited Articles"];
if(props.onPage === "Article Preview") renderArray = ["Your Feed", "Global Feed", "Popular Feed"];

  return (
    <div className='articles-toggle'>
      <ul className='nav nav-pills outline-active'>
    {
        renderArray.map((feed, index) => {
            props.onPage === "User Profile"? ():()

        }
    }

        {/* {renderArray.map((feed, index) => {
          {props.onPage === "User Profile"? 
          (
            <li className='nav-item'>
              <FeedsNav
                navName={feed}
                author_name={props.author_name}
                setLoading={props.setLoading}
                setProfileNavStatus={props.setProfileNavStatus}
                profileNavStatusLeft={props.profileNavStatusLeft}
                profileNavStatusRight={props.profileNavStatusRight}
                loadUserProfileDetail={props.loadUserProfileDetail}
                onFavoritedArticleNavClicked={props.onFavoritedArticleNavClicked}
              />
            </li>
          ):(<li className='nav-item'>
          <FeedsNav
             navName={feed}
             userInformation={props.userInformation}
             setLoading={props.setLoading}
             loadYourFeedArticles={props.loadYourFeedArticles}
             setHomeNavStatus={props.setHomeNavStatus}
             yourNav={props.yourNav}
             loadGlobalFeeds={props.loadGlobalFeeds}
                globalNav={props.globalNav}
                popularNav={props.popularNav}
                currentTagName={props.currentTagName}
                onFavoritedArticleClicked={props.onFavoritedArticleClicked}/>
        </li>)            
          }         */}
          </ul>
    </div>
  );
};
