import React from "react";
import { ArticlePreview } from "./ArticlePreview";
import { PopularTages } from "./PopularTags";
import { Banner } from "./Banner";
import { connect } from "react-redux";

const InternalMainPage = props => {

  return (
    <div className="home-page">
      {props.loading === "LOADING" ? (<div className="loading_status">
        Loading...
      </div>) : null}
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

  // const {
  // } = asyncReducer;

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

