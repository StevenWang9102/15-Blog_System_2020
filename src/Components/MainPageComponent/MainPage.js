import React from "react";
import { connect } from "react-redux";
import {ArticlePreview} from "./ArticlePreview";
import PopularTages from "./PopularTags";
import Banner from "./Banner";

const InternalMainPage = props => {
  console.log(props.articleLibrary);

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

const mapStateToProps = state => {
  return { ...state }; 
};

const mapDismatchToProps = dispatch => {
  return {};
};

export const MainPage = connect(mapStateToProps, mapDismatchToProps)(InternalMainPage)