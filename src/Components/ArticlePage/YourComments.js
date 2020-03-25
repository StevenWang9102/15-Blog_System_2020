import React from "react";
import PropTypes from "prop-types";

export const YourComments = props => {
  return (
    <div className='row'>
      <div className='col-xs-12 col-md-8 offset-md-2'>
        <form className='card comment-form'>
          <div className='card-block'>
            <textarea
              onChange={event => props.setMyComment(event.target.value)}
              className='form-control'
              placeholder='Write a comment...'
              rows='3'></textarea>
          </div>
          <div className='card-footer'>
            <img
              src={props.userInformation.image}
              className='comment-author-img'
              alt='au'
            />
            <button
              type='button'
              className='btn btn-sm btn-primary'
              onClick={() =>
                props.onPostCommentsClicked(props.currentSlug, props.myComment)
              }>
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

YourComments.propTypes = {
  userInformation: PropTypes.object,
  currentSlug: PropTypes.string
};
