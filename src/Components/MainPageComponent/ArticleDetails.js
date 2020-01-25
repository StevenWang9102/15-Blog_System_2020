import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { loadInitArticleDetail } from "../../ReduxStore/FeedDetails/feedActions";
import { useParams } from "react-router-dom";

const InternalArticleDetails = props => {
  const { slug } = useParams();

  useEffect(() => {
    props.loadInitArticleDetail(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  
  return (
    <div className='article-page'>
      <div className='banner'>
        <div className='container'>
          {/* 文章标题部分 */}
          {props.currentArticleDetails.author && (
            <div>
              <h1>{props.currentArticleDetails.title}</h1>
              <div className='article-meta'>
                <a href='#top'>
                  <img
                    className='author-image'
                    src={props.currentArticleDetails.author.image}
                    alt='au'
                  />
                </a>
                <div className='info'>
                  <a href='#top' className='author'>
                    {props.currentArticleDetails.author.username}
                  </a>
                  <span className='date'>
                    {dateFormat(
                      props.currentArticleDetails.author.updatedAt,
                      "ddd mmm dd yyyy"
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 文章内容部分 */}
      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12 article-detail'>
            {props.currentArticleDetails.body}
          </div>
        </div>
        <hr />

        {/* 文章对应的评论部分 */}
        <div className='row'>
          <div className='col-xs-12 col-md-8 offset-md-2'>
            <div className='card'>
              <div className='card-block'>
                <p className='card-text'>
                  {props.currentComments.comments &&
                    props.currentComments.comments.body}
                </p>
              </div>

              {props.currentArticleDetails.author && (
                <div className='card-footer'>
                  <a href='#top' className='comment-author'>
                    <img
                      src={props.currentArticleDetails.author.image}
                      className='comment-author-img'
                      alt="au"
                    />
                  </a>
                  <a href='#top' className='comment-author'>
                    {props.currentArticleDetails.author.username}
                  </a>
                  <span className='date-posted'>
                  {dateFormat(props.currentArticleDetails.updatedAt, "ddd mmm dd yyyy")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InternalArticleDetails.propTypes = {
  currentComments: PropTypes.object.isRequired,
  currentArticleDetails: PropTypes.object.isRequired
};

const mapStateToProps = ({currentArticleDetails,currentComments }) => {
  return {currentArticleDetails,currentComments};
};

const mapDismatchToProps = dispatch => {
  return {
    loadInitArticleDetail: slug => dispatch(loadInitArticleDetail(slug))
  };
};

export const ArticleDetails = connect(
  mapStateToProps,
  mapDismatchToProps
)(InternalArticleDetails);
