import React, { useState } from "react";
import { displayLimit } from "../../ReduxStore/HttpClient";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  myButton: {
    flexBasis: "1",
    height: "30px",
    weight: "30px",
    border: "0px",
    padding: "0px",
    borderRadius: "4px",
    margin: "5px",
    backgroundColor: props => props.clickedPage,

    "& a": {
      padding: props => props.padding
    },

    "&:hover": {
      opacity: 0.7,
      backgroundColor: "rgba(0, 0, 0, 0.150)"
    }
  }
});

export const PageTunner = props => {
  const [clickedIndex, setClickedIndex] = useState(-1);

  const Page = ({ children, ...props }) => {
    const classes = useStyles(props);
    return <button className={`${classes.myButton}`}>{children}</button>;
  };

  // Make an Page Number List
  const pageNumber = Math.round(props.articlesAllCount / displayLimit);
  const myPageNumArray = [];
  for (let i = 1; i <= pageNumber; i++) {
    myPageNumArray.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumber !== 1 &&
          myPageNumArray.map((pageNumber, index) => {
            let offset = index * displayLimit;
            let currentTag = "";
            if (props.globalNav === "active") currentTag = "global_feed";
            if (props.yourNav === "active") currentTag = "your_feed";
            if (props.popularNav === "active") currentTag = "popular_feed";

            // Deal with page padding
            let padding = "";
            if (pageNumber < 10) {
              padding = "10px 15px 10px 15px";
            } else if (pageNumber >= 10 && pageNumber < 20) {
              padding = "5px 13px 5px 13px";
            } else {
              padding = "0px 11px 0px 11px";
            }

            // Deal with choosen page's background
            let clickedPage = "rgba(0, 0, 0, 0.027)";
            if (index === clickedIndex) clickedPage = "rgb(55, 168, 55, 0.2)";

            // Pages on "ArticlePriview" Page
            if (props.fromPage === "ArticlePriview") {
              return (
                <Page padding={padding} key={index} clickedPage={clickedPage}>
                  <Link
                    to={`/home/${currentTag}/p${pageNumber}`}
                    onClick={() => {                      
                      setClickedIndex(index);
                      props.setCurrentPageOffSet(offset);
                      if (currentTag === "global_feed")
                        props.loadGlobalFeeds(displayLimit, offset);
                      else if (currentTag === "your_feed")
                        props.loadYourFeedArticles(displayLimit, offset);
                      else if (currentTag === "popular_feed"){
                        props.onPopularTagClicked(props.currentTagName, displayLimit, offset);
                      }
                    }}>
                    {pageNumber}
                  </Link>
                </Page>
              );
            } else {
              // Pages on "User Profile" Page
              return (
                <Page padding={padding} key={index} clickedPage={clickedPage}>
                  <Link
                    onClick={() => {
                      if (props.profileNavStatusLeft === "active")
                        props.loadUserProfileDetail(
                          props.author_name,
                          displayLimit,
                          offset
                        );
                      else
                        props.onFavoritedArticleNavClicked(
                          props.author_name,
                          displayLimit,
                          offset
                        );
                    }}>
                    {pageNumber}
                  </Link>
                </Page>
              );
            }
          })}
      </ul>
    </nav>
  );
};
