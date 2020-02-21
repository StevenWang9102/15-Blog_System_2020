import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { onPostCommentsClicked } from "../../ReduxStore/FeedDetails/feedActions";


const InternalArticleComments = props => {
  const [myComment, setMyComment] = useState("");

  return (
    <div className='commonts-container'>

      {/* ---------------- Your Comments ----------------  */}
      <div className='row'>
        <div className='col-xs-12 col-md-8 offset-md-2'>
          <div className='card comment-form'>
            <div className='card-block'>
              <textarea
                onChange={event => setMyComment(event.target.value)}
                className='form-control'
                placeholder='Write a comment...'
                rows='3'></textarea>
            </div>
            <div className='card-footer'>
              <img
                src='http://i.imgur.com/Qr71crq.jpg'
                className='comment-author-img'
                alt='au'
              />
              <button
                className='btn btn-sm btn-primary'
                onClick={(event) => {
                  props.onPostCommentsClicked(props.currentSlug, myComment)
                }
                }
              >Post Comment</button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Public Comments ----------------  */}
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
                      </a>
                      &nbsp;
                      <a href='#top' className='comment-author'>
                        {comment.author.username}
                      </a>
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
    </div>
  );
};

InternalArticleComments.propTypes = {
  currentComments: PropTypes.object.isRequired
};

const mapStateToProps = ({ currentComments, currentArticleSlug, currentSlug }) => {
  return { currentComments, currentArticleSlug, currentSlug };
};

const mapDispatchToProps = dispatch => {
  return {
    onPostCommentsClicked: (slug, myComment) =>
      dispatch(onPostCommentsClicked(slug, myComment))
  };
};

export const ArticleComments = connect(
  mapStateToProps,
  mapDispatchToProps)(
    InternalArticleComments
  );
