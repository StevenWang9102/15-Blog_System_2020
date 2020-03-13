import React from "react";
import { ArticlePreview } from "../ArticlePage/ArticlePreview";
import { PopularTages } from "./PopularTags";
import { Banner } from "./Banner";
import { connect } from "react-redux";
import { emptyArticleAllCount } from "../../ReduxStore/Actions/eventActions"
const InternalMainPage = props => {
  return (
    <div className='home-page'>
      <Banner/>
      <div className='container page'>
        <div className='row'>
          <ArticlePreview/>
          <PopularTages
            emptyArticleAllCount={props.emptyArticleAllCount}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    emptyArticleAllCount: () => dispatch(emptyArticleAllCount()),
  };
};

export const MainPage = connect(null, mapDispatchToProps)(InternalMainPage);
