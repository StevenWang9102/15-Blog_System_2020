import React from "react";
import { ArticlePreview } from "../ArticlePage/ArticlePreview";
import { PopularTages } from "./PopularTags";
import { Banner } from "./Banner";
import { connect } from "react-redux";

const InternalMainPage = props => {
  return (
    <div className='home-page'>
      <Banner/>
      <div className='container page'>
        <div className='row'>
          <ArticlePreview/>
          <PopularTages/>
        </div>
      </div>
    </div>
  );
};

export const MainPage = connect(null, null)(InternalMainPage);
