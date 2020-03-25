import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setHomeNavStatus } from "../../ReduxStore/Actions/eventActions";
import { popularTagClicked } from "../../ReduxStore/Actions/articleActions";

const InternalPopularTages = props => {
  return (
    <div className='col-md-3'>
      <div className='sidebar'>
        <p>Popular Tags</p>
        <div className='tag-list'>
          {props.popularTags.map((tagName, index) => {
            return (
              <NavLink
                className='tag-pill tag-default'
                key={index}
                value={tagName}
                onClick={() => {
                  props.emptyArticleAllCount();
                  props.onPopularTagClicked(tagName, 10, 0);
                  props.setHomeNavStatus("null", "null", "active");
                }}
                to={`/home/popular_tags#${tagName}`}>
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
  onPopularTagClicked: PropTypes.func.isRequired
};

const mapStateToProps = ({ articleReducer }) => {
  const { popularTags } = articleReducer;

  return {
    popularTags
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPopularTagClicked: (tagName, limit, offset) =>
      dispatch(popularTagClicked(tagName, limit, offset)),
    setHomeNavStatus: (your, favorited, popular) =>
      dispatch(setHomeNavStatus(your, favorited, popular))
  };
};

export const PopularTages = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalPopularTages);
