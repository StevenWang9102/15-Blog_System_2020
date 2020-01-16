import React from "react";
import {ArticlePreview} from "./ArticlePreview";
import {PopularTages} from "./PopularTags";
import Banner from "./Banner";

const MainPage = props => {
  return (
    <div class="home-page">
      <Banner />
      <div class='container page'>
        <div class='row'>
          <ArticlePreview />
          <PopularTages />
        </div>
      </div>
    </div>
  );
};

export default MainPage;