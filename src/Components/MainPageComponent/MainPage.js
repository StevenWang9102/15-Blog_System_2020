import React from "react";
import {ArticlePreview} from "./ArticlePreview";
import {PopularTages} from "./PopularTags";
import {Banner} from "./Banner";

export const MainPage = props => {

return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <ArticlePreview />
          <PopularTages />
        </div>
      </div>
    </div>
  );
};

