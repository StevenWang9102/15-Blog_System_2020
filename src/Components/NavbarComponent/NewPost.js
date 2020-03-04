import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading } from "../../ReduxStore/FeedDetails/loadActions";
import { onPostArticleClicked } from "../../ReduxStore/FeedDetails/displayActions";

import { Redirect } from "react-router-dom";

const InternalNewPost = props => {
  const { slug } = useParams();

  const [title, setTitle] = useState(
    slug ? props.currentArticleDetails.title : ""
  );
  const [description, setDescription] = useState(
    slug ? props.currentArticleDetails.description : ""
  );
  const [content, setContent] = useState(
    slug ? props.currentArticleDetails.body : ""
  );
  const [tags, setTags] = useState(
    slug ? props.currentArticleDetails.tagList : ""
  );

  return (
    <div>
      {props.article_loaded ?
        <Redirect to={`/article-detail/${props.newPosedArticleSlug}`} />
        :
        <div className='auth-page'>
          <div className='editor-page'>
            <div className='container page'>
              <div className='row'>
                <div className='col-md-10 offset-md-1 col-xs-12'>
                  <form>
                    <fieldset>
                      {/* ---- Article Title ---- */}
                      <fieldset className='form-group'>
                        <input
                          type='text'
                          className='form-control form-control-lg'
                          onChange={event => setTitle(event.target.value)}
                          value={title}
                          placeholder='Article Title'></input>
                      </fieldset>

                      {/* ---- Article Description ---- */}
                      <fieldset className='form-group'>
                        <input
                          type='text'
                          className='form-control'
                          value={description}
                          onChange={event => setDescription(event.target.value)}
                          placeholder="What's this article about?"></input>
                      </fieldset>

                      {/* ---- Article Content ---- */}
                      <fieldset className='form-group'>
                        <textarea
                          className='form-control'
                          rows='8'
                          value={content}
                          onChange={event => setContent(event.target.value)}
                          placeholder='Write your article (in markdown)'></textarea>
                      </fieldset>

                      {/* ---- Article Tags ---- */}
                      <fieldset className='form-group'>
                        <input
                          type='text'
                          className='form-control'
                          value={tags}
                          onChange={event => setTags(event.target.value)}
                          placeholder='Enter tags'></input>
                        <div className='tag-list'></div>
                      </fieldset>

                      <button
                        className='btn btn-lg pull-xs-right btn-primary'
                        type='button'
                        onClick={() => {
                          props.setLoading("LOADING")
                          props.onPostArticleClicked(
                            title,
                            description,
                            content,
                            tags,
                            props.currentSlug
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
      }
    </div>
  );
};

const mapStateToProps = ({ syncReducer, asyncReducer }) => {
  const {
    article_loaded,
  } = syncReducer;

  const {
    currentSlug,
    currentArticleDetails,
    newPosedArticleSlug
  } = asyncReducer;

  return {
    currentSlug,
    currentArticleDetails,
    article_loaded,
    newPosedArticleSlug
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: (status) => dispatch(setLoading(status)),
    onPostArticleClicked: (title, description, content, tags, slug) =>
      dispatch(onPostArticleClicked(title, description, content, tags, slug))
  };
};
export const NewPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalNewPost);
