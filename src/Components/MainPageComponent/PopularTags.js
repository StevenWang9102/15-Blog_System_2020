import React from "react";
import { connect } from "react-redux";

const InternalPopularTages = props => {
  const tempTagList = [];

  const reducer = (allElements, element) => {
    if (element in allElements) allElements[element]++;
    else allElements[element] = 1;
    return allElements;
  };

  const PopularTagesCounter = () => {
    // 数据输入进来
    if(props.articleLibrary){
      props.articleLibrary.forEach(article => {
        console.log(article.tagList);
        if (article.tagList.length !== 0)
          article.tagList.forEach(item => {
            tempTagList.push(item);
          });
      });
    }
       
    // 数据统计，显示前五
    const myObject = tempTagList.reduce(reducer, {});
    return Object.keys(myObject).slice(0, 5);
  };

  return (
    <div class='col-md-3'>
      <div class='sidebar'>
        <p>Popular Tags</p>

        <div class='tag-list'>
          {PopularTagesCounter().map(tag => {
            return (
              <a href='#top' class='tag-pill tag-default'>
                {tag}
              </a>
            );
          })}
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
