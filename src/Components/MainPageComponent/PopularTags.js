import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { popularTagClicked, smallNavClicked } from "../../ReduxStore/FeedDetails/feedActions";
import { NavLink } from "react-router-dom";


const InternalPopularTages = props => {
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
          {props.popularTags &&
            props.popularTags.map((tagName, index) => {
              return (
              <NavLink
                className="tag-pill tag-default" 
                key={index}
                value = {tagName}
                onClick = {()=> {
                  props.onPopularTagClicked(tagName)
                  props.onSmallNavClicked('null')
                }}
                to='/home#popular_tags'
                >
                {tagName}
              </NavLink>
              );
            })}
        </div>
      </div>
    </div>
  );
};

InternalPopularTages.propTypes = {
  popularTags: PropTypes.array.isRequired,
  onPopularTagClicked: PropTypes.func.isRequired,
};

const mapStateToProps = ({ popularTags }) => {
  return { popularTags };
};

const mapDispatchToProps = dispatch => {
  return {
    onPopularTagClicked: (tagName) => dispatch(popularTagClicked(tagName)),
    onSmallNavClicked: (status) => dispatch(smallNavClicked(status)),
  };
};

export const PopularTages = connect(mapStateToProps, mapDispatchToProps)(InternalPopularTages);
