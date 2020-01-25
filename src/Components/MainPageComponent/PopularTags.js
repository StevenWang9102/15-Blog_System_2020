import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const InternalPopularTages = props => {  
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

InternalPopularTages.propTypes = {
  popularTags: PropTypes.array.isRequired,

};

const mapStateToProps = ({popularTags}) => {
  return {popularTags};
};

export const PopularTages = connect(
  mapStateToProps)(InternalPopularTages);
