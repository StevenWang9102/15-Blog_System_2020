import React, { useState } from "react";
import { connect } from "react-redux";

const InternalPopularTages = props => {
  const [popularTags, setPopularTags] = useState(["第一名", "第二名"]);
  const tempTagList = [];

  const reducer = (allElements, element) => {
    if (element in allElements) allElements[element]++;
    else allElements[element] = 1;
    return allElements;
  };

  console.log(props.articleLibrary);
  
  return (
    <div class='col-md-3'>
      <div class='sidebar'>
        <p>Popular Tags</p>

        <div class='tag-list'>
          {
          popularTags.map((popular)=>{

              //数据变换
              props.articleLibrary && props.articleLibrary.forEach(article => {
                  console.log(article.tagList)
                  if (article.tagList.length !== 0) 
                    article.tagList.forEach(item => {
                      tempTagList.push(item);
                      console.log(tempTagList)
                    });  
                })
              

              // 数据统计，显示前五
              const myObject = tempTagList.reduce(reducer, {});
              console.log(Object.keys(myObject).slice(0, 3));
              
              //循环渲染
              Object.keys(myObject).slice(0, 3).map((p)=>{ 
                return(
                  <a href='#top' class='tag-pill tag-default'>
                    {p}
                  </a>
                )
              })
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
