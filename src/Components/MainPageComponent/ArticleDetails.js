import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { loadInitArticleDetail } from "../../ReduxStore/FeedDetails/feedActions";
import { useParams } from "react-router-dom";
import { ArticleComments } from "./ArticleComments";

const InternalArticleDetails = props => {
  
  const { article_slug } = useParams();

  useEffect(() => {
    props.loadInitArticleDetail(article_slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='article-page'>
      <div className='banner'>
        <div className='container'>

          {/* ---------------- Article Title  ---------------- */}
          {props.currentArticleDetails.author && (
            <div>
              <h1>{props.currentArticleDetails.title}</h1>

              <div className='article-meta'>

                <Link to= {'/user-profile/' + props.currentArticleDetails.author.username}>
                  <a href='#top'>
                    <img
                      className='author-image'
                      src={props.currentArticleDetails.author.image}
                      alt='au'
                    />
                  </a>
                  <div className='info'>
                    <a href='#top' className='author'>
                      {props.currentArticleDetails && props.currentArticleDetails.author.username}
                    </a>
                    <span className='date'>
                      {dateFormat(
                        props.currentArticleDetails.author.updatedAt,
                        "ddd mmm dd yyyy"
                      )}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- Article Details ----------------  */}
      <div className='container page'>
        <div className='row article-content'>
          <div className='col-md-12 article-detail'>
            {props.currentArticleDetails.body}
          </div>
        </div>
        <hr/>
        <ArticleComments />
      </div>
    </div>
  );
};

InternalArticleDetails.propTypes = {
  currentArticleDetails: PropTypes.object.isRequired
};

const mapStateToProps = ({ currentArticleDetails,currentProfileData }) => {
  return { currentArticleDetails,currentProfileData };
};

const mapDispatchToProps = dispatch => {
  return {
    loadInitArticleDetail: article_slug => dispatch(loadInitArticleDetail(article_slug))
  };
};

export const ArticleDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticleDetails);
