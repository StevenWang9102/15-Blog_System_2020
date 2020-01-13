import React from "react";
import { connect } from "react-redux";
import ArticlePreview from '../Article_preview'
import PopularTages from '../PopularTags'


const MainPage = props => {

  console.log(props.articleLibrary);
  
  return (
    <div>
      <div class='home-page'>
        <div class='banner'>
          <div class='container'>
            <h1 class='logo-font'>conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      </div>
      <ArticlePreview/>
      <PopularTages/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...state}; // 暂时@@@
}; 


const mapDismatchToProps = dispatch => {
  return {
  };
};
export default connect(mapStateToProps, mapDismatchToProps)(MainPage);