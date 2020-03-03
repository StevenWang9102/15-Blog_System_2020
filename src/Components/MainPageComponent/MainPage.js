import React from "react";
import { ArticlePreview } from "./ArticlePreview";
import { PopularTages } from "./PopularTags";
import { Banner } from "./Banner";
import { connect } from "react-redux";

const InternalMainPage = props => {

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

const mapStateToProps = ({ syncReducer, asyncReducer }) => {
  const {
    loading
  } = syncReducer;
  
  return {
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};
export const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalMainPage);

