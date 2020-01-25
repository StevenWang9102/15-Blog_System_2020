import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";

const InternalArticleComments = props => {
  return (
    <div className='row'>
      <div className='col-xs-12 col-md-8 offset-md-2'>
        {props.currentComments.comments &&
          props.currentComments.comments.map((comment, index) => {              
            return (
              <div key={index}>
                <div className='card'>
                  <div className='card-block'>
                    <p className='card-text'>{comment.body}</p>
                  </div>
                  <div className='card-footer'>
                    <a href='#top' className='comment-author'>
                      <img
                        src={comment.author.image}
                        className='comment-author-img'
                        alt='au'
                      />
                    </a> &nbsp;
                    <a href='#top' className='comment-author'>
                      {comment.author.username}
                    </a>
                    <span className='date-posted'>
                      {dateFormat(
                        comment.updatedAt,
                        "ddd mmm dd yyyy"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

InternalArticleComments.propTypes = {
  currentComments: PropTypes.object.isRequired
};

const mapStateToProps = ({ currentArticleDetails, currentComments }) => {
  return { currentArticleDetails, currentComments };
};

export const ArticleComments = connect(mapStateToProps)(
  InternalArticleComments
);
