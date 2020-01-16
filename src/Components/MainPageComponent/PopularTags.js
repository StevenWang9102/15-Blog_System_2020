import React from "react";
import { connect } from "react-redux";

const InternalPopularTages = props => {
  const tempTagList = [];
  let popularTags = [];

  const reducer = (allElements, element) => {
    if (element in allElements) allElements[element]++;
    else allElements[element] = 1;
    return allElements;
  };

  return (
    <div class='col-md-3'>
      <div class='sidebar'>
        <p>Popular Tags</p>

        <div class='tag-list'>
          {props.articleLibrary &&
            props.articleLibrary.forEach(article => {
              if (article.tagList.length !== 0) {
                article.tagList.forEach(item => {
                  tempTagList.push(item);
                });
              }
              const myObject = tempTagList.reduce(reducer, {});
              popularTags = Object.keys(myObject).slice(0, 4);
              console.log(popularTags);
            })}
          <a href='#top' class='tag-pill tag-default'>
            programming
          </a>
          <a href='#top' class='tag-pill tag-default'>
            programming
          </a>
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

export const PopularTages = connect(
  mapStateToProps,
  mapDismatchToProps
)(InternalPopularTages);
