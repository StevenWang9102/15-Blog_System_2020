import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { popularTagClicked,  setNavStatus } from "../../ReduxStore/FeedDetails/feedActions";
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
                  console.log('点击popular tags');
                  const tag = tagName
                  props.onPopularTagClicked(tag)
                  props.setNavStatus('null', 'null', 'active')
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
    setNavStatus: (status1, status2, status3) => dispatch(setNavStatus(status1, status2, status3)),
  };
};

export const PopularTages = connect(mapStateToProps, mapDispatchToProps)(InternalPopularTages);
