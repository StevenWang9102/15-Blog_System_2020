import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  content: {
    textAlign: "left",
    marginLeft: "10px"
  }
});


export const ArticleContent = props => {
  const Content = ({ children }) => {
    const classes = useStyles();
    return (
      <div className={`row article-content ${classes.content}`}>{children}</div>
    );
  };

  return (
    <div className='container page'>
      <Content>
        <div className='col-md-12 article-detail'>
          {props.currentArticleDetails.body}
        </div>
      </Content>
      <hr />
    </div>
  );
};
