import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { popularTagClicked,  setHomeNavStatus } from "../../ReduxStore/FeedDetails/feedActions";
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
                  const tag = tagName
                  props.onPopularTagClicked(tag)
                  props.setHomeNavStatus(['null', 'null', 'active'])
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

const mapStateToProps = ({syncReducer}) => {
  const {
    popularTags
  } = syncReducer

  return {
    popularTags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPopularTagClicked: (tagName) => dispatch(popularTagClicked(tagName)),
    setHomeNavStatus: (status) => dispatch(setHomeNavStatus(status)),
  };
};

export const PopularTages = connect(mapStateToProps, mapDispatchToProps)(InternalPopularTages);
