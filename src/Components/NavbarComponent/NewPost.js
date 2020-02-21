import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { onPostArticleClicked, loadInitArticleDetail } from "../../ReduxStore/FeedDetails/feedActions";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const InternalNewPost = props => {
  const [title, setTitle] = useState(props.currentArticleDetails.title || "");
  const [description, setDescription] = useState(
    props.currentArticleDetails.description || ""
  );
  const [content, setContent] = useState(
    props.currentArticleDetails.body || ""
  );
  const [tags, setTags] = useState(props.currentArticleDetails.tagList || []);
  // tagList

  // 从哪里拿到这篇文章的slug， 应该是内存
  const { slug } = useParams();

  // 发送请求这篇文章的内容
  console.log(props.newSlug);
  
  useEffect(() => {
    props.loadInitArticleDetail(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // <Router>
    <div>
      {props.article_reloaded ? (
        <Redirect to = {`/article-detail/${props.newSlug}`} />
        // 应该是新的slug@@@@@@@@@@
      ) : (
          <div className='auth-page'>
            <div class='editor-page'>
              <div class='container page'>
                <div class='row'>
                  <div class='col-md-10 offset-md-1 col-xs-12'>
                    <form>
                      <fieldset>
                        {/* ---- Title ---- */}
                        <fieldset class='form-group'>
                          <input
                            type='text'
                            class='form-control form-control-lg'
                            onChange={event => setTitle(event.target.value)}
                            value={title}
                            placeholder='Article Title'></input>
                        </fieldset>

                        {/* ---- Description ---- */}
                        <fieldset class='form-group'>
                          <input
                            type='text'
                            class='form-control'
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                            placeholder="What's this article about?"></input>
                        </fieldset>

                        {/* ---- Content ---- */}
                        <fieldset class='form-group'>
                          <textarea
                            class='form-control'
                            rows='8'
                            value={content}
                            onChange={event => setContent(event.target.value)}
                            placeholder='Write your article (in markdown)'></textarea>
                        </fieldset>

                        {/* ---- Tags ---- */}
                        <fieldset class='form-group'>
                          <input
                            type='text'
                            class='form-control'
                            // value= {tags && tags.join('')}
                            onChange={event => setTags(event.target.value)}
                            placeholder='Enter tags'></input>
                          <div class='tag-list'></div>
                        </fieldset>

                        {/* <Link to=''> */}
                        <button
                          class='btn btn-lg pull-xs-right btn-primary'
                          type='button'
                          onClick={() => {
                            props.onPostArticleClicked(
                              title,
                              description,
                              content,
                              tags,
                              props.currentSlug,
                            );
                          }}>
                          Publish Article
                        {/* 
                        在文章已经发布成功之后吧 = 对应拿到返回值，
                        点击后跳转到新的文章
                      */}
                        </button>
                        {/* </Link> */}
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
    // </Router>
  );
};

const mapStateToProps = ({ currentSlug, currentArticleDetails,article_reloaded, newSlug  }) => {
  return { currentSlug, currentArticleDetails,article_reloaded, newSlug  };
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
