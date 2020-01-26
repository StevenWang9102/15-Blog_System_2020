import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { popularTagClicked } from "../../ReduxStore/FeedDetails/feedActions";


const InternalPopularTages = props => {
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
          {props.popularTags &&
            props.popularTags.map((tagName, index) => {
              return (
                <a 
                  href="#top" 
                  className="tag-pill tag-default" 
                  key={index}
                  value = {tagName}
                  onClick = {()=> {
                    props.onPopularTagClicked(tagName)
                  }}
                  >
                  {tagName}
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};

InternalPopularTages.propTypes = {
  popularTags: PropTypes.array.isRequired
};

const mapStateToProps = ({ popularTags }) => {
  return { popularTags };
};

const mapDispatchToProps = dispatch => {
  return {
    onPopularTagClicked: (tagName) => dispatch(popularTagClicked(tagName)),
  };
};

export const PopularTages = connect(mapStateToProps, mapDispatchToProps)(InternalPopularTages);
