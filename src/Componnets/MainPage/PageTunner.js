import React from "react";
import { articleCountDisplay } from "../../Functions/httpMethods";
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
        {myPageNumArray.map((pageNumber, index) => {
          const articleOffSet = index * articleCountDisplay;

          return (
            <Page>
              <a
                className='page-link'
                href={`#p${pageNumber}`}
                onClick={() => {
                  props.setLoading("LOADING");
                  if (props.favoriteNav === "active")
                    props.loadGlobalFeeds(articleCountDisplay, articleOffSet);
                  else if (props.yourNav === "active")
                    props.loadYourFeedArticles(
                      articleCountDisplay,
                      articleOffSet
                    );
                  else props.loadPopularTags();
                }}>
                {pageNumber}
              </a>
            </Page>
          );
        })}
      </ul>
    </nav>
  );
};
