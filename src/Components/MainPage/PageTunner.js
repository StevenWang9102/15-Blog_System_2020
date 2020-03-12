import React from "react";
import { articleCountDisplay } from "../../Functions/HttpClient";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  myButton: {
    border: "0px",
    padding: "0px"
  },
  "& a": {
    height: "5px",
    width: "5px"
  }
});

export const PageTunner = props => {
  const Page = ({ children }) => {
    const classes = useStyles();
    return (
      <button className={`page-item ${classes.myButton}`}>{children}</button>
    );
  };

  const pageNumber = Math.round(props.articlesAllCount / articleCountDisplay);

  const myPageNumArray = [];
  for (let i = 1; i <= pageNumber; i++) {
    myPageNumArray.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumber !== 1 &&
          myPageNumArray.map((pageNumber, index) => {
            const offset = index * articleCountDisplay;

            // From "ArticlePriview" Page
            if (props.fromPage === "ArticlePriview") {
              return (
                <Page key={index}>
                  <a
                    className='page-link'
                    href={`#p${pageNumber}`}
                    onClick={() => {
                      props.setLoading("LOADING");
                      props.setCurrentPageOffSet(offset);
                      if (props.favoriteNav === "active")
                        props.loadGlobalFeeds(articleCountDisplay, offset);
                      else if (props.yourNav === "active")
                        props.loadYourFeedArticles(articleCountDisplay, offset);
                      else props.loadPopularTags();
                    }}>
                    {pageNumber}
                  </a>
                </Page>
              );
            } else {
              // From "User Profile" Page
              return (
                <Page key={index}>
                  <a
                    className='page-link'
                    href={`#p${pageNumber}`}
                    onClick={() => {
                      if (props.profileNavStatusLeft === "active")
                        props.loadUserProfileDetail(
                          props.author_name,
                          articleCountDisplay,
                          offset
                        );
                      else
                        props.onFavoritedArticleNavClicked(
                          props.author_name,
                          articleCountDisplay,
                          offset
                        );
                    }}>
                    {pageNumber}
                  </a>
                </Page>
              );
            }
          })}
      </ul>
    </nav>
  );
};
