import React from 'react';
import { connect } from 'react-redux';

const InternalPopularTages = props => {
  
  console.log(props.popularTags);
  
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
          {props.popularTags && props.popularTags.map((tag, index) => {
            return (
              <a href="#top" className="tag-pill tag-default" key={index}>
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
