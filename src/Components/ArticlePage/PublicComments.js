import React from "react";
import dateFormat from "dateformat";
import PropTypes from "prop-types";
import { HashRouter as Router, Link } from "react-router-dom";

export const PublicComments = props => {
  return (
    <Router>
      <div className='row'>
        <div className='col-xs-12 col-md-8 offset-md-2'>
          {props.currentComments &&
            props.currentComments.comments &&
            props.currentComments.comments.map((comment, index) => {
              return (
                <div key={index}>
                  <div className='card'>
                    <div className='card-block'>
                      <p className='card-text'>{comment.body}</p>
                    </div>

                    <div className='card-footer'>
                      <Link
                        to={`/user_profile/${comment.author.username}`}
                        className='comment-author'>
                        <img
                          src={comment.author.image}
                          className='comment-author-img'
                          alt=''
                        />
                      </Link>
                      &nbsp;
                      <Link
                        to={`/user_profile/${comment.author.username}`}
                        className='comment-author'>
                        {comment.author.username}
                      </Link>
                      <span className='date-posted'>
                        {dateFormat(comment.updatedAt, "ddd mmm dd yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Router>
  );
};

PublicComments.propTypes = {
  currentComments: PropTypes.object
};
