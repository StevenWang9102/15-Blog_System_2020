import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { onPostArticleClicked, loadInitArticleDetail } from "../../ReduxStore/FeedDetails/feedActions";

import {
  Redirect
} from "react-router-dom";

const InternalNewPost = props => {

  const [title, setTitle] = useState(props.currentArticleDetails.title || "");
  const [description, setDescription] = useState( props.currentArticleDetails.description || "" );
  const [content, setContent] = useState( props.currentArticleDetails.body || "" );
  const [tags, setTags] = useState(props.currentArticleDetails.tagList || []);

  const { slug } = useParams();
  // 还是通过 props.currentSlug

  useEffect(() => {
    // 此处是在存在这篇文章的情况下，才执行的 - 判据：
    slug && props.loadInitArticleDetail(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(props.currentSlug);
  
  return (
    <div>
      {props.article_reloaded ? (
        <Redirect to={`/article-detail/${props.newSlug}`} />
      ) : (
          <div className='auth-page'>
            <div className='editor-page'>
              <div className='container page'>
                <div className='row'>
                  <div className='col-md-10 offset-md-1 col-xs-12'>
                    <form>
                      <fieldset>
                        {/* ---- Title ---- */}
                        <fieldset className='form-group'>
                          <input
                            type='text'
                            className='form-control form-control-lg'
                            onChange={event => setTitle(event.target.value)}
                            value={title}
                            placeholder='Article Title'></input>
                        </fieldset>

                        {/* ---- Description ---- */}
                        <fieldset className='form-group'>
                          <input
                            type='text'
                            className='form-control'
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                            placeholder="What's this article about?"></input>
                        </fieldset>

                        {/* ---- Content ---- */}
                        <fieldset className='form-group'>
                          <textarea
                            className='form-control'
                            rows='8'
                            value={content}
                            onChange={event => setContent(event.target.value)}
                            placeholder='Write your article (in markdown)'></textarea>
                        </fieldset>

                        {/* ---- Tags ---- */}
                        <fieldset className='form-group'>
                          <input
                            type='text'
                            className='form-control'
                            // value= {tags && tags.join('')}
                            onChange={event => setTags(event.target.value)}
                            placeholder='Enter tags'></input>
                          <div className='tag-list'></div>
                        </fieldset>

                        <button
                          className='btn btn-lg pull-xs-right btn-primary'
                          type='button'
                          onClick={() => {
                            props.onPostArticleClicked(
                              title,
                              description,
                              content,
                              tags,
                              props.currentSlug,
                              // 这样拿好吗？？？？
                            );
                          }}>
                          Publish Article
                        </button>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

const mapStateToProps = ({ currentSlug, currentArticleDetails, article_reloaded, newSlug }) => {
  return { currentSlug, currentArticleDetails, article_reloaded, newSlug };
};

const mapDispatchToProps = dispatch => {
  return {
    onPostArticleClicked: (title, description, content, tags, slug) =>
      dispatch(onPostArticleClicked(title, description, content, tags, slug)),
    loadInitArticleDetail: slug => dispatch(loadInitArticleDetail(slug))
  };
};
export const NewPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalNewPost);
