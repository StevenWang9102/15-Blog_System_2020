import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { onPostArticleClicked, loadInitArticleDetail } from "../../ReduxStore/FeedDetails/feedActions";

const InternalNewPost = props => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

// 从哪里拿到这篇文章的slug， 应该是内存
// 每次进入这个界面，都去看看这篇文章有没有值
// 目前请求失败@@@@@@@

useEffect(() => {
  props.loadInitArticleDetail(props.currentSlug);
  // 发送请求这篇文章的内容
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
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
                      placeholder='Article Title'></input>
                  </fieldset>

                  {/* ---- Description ---- */}
                  <fieldset class='form-group'>
                    <input
                      type='text'
                      class='form-control'
                      onChange={event => setDescription(event.target.value)}
                      placeholder="What's this article about?"></input>
                  </fieldset>

                  {/* ---- Content ---- */}
                  <fieldset class='form-group'>
                    <textarea
                      class='form-control'
                      rows='8'
                      onChange={event => setContent(event.target.value)}
                      placeholder='Write your article (in markdown)'></textarea>
                  </fieldset>

                  {/* ---- Tags ---- */}
                  <fieldset class='form-group'>
                    <input
                      type='text'
                      class='form-control'
                      onChange={event => setTags(event.target.value)}
                      placeholder='Enter tags'></input>
                    <div class='tag-list'></div>
                  </fieldset>

                  <button
                    class='btn btn-lg pull-xs-right btn-primary'
                    type='button'
                    onClick={()=> {
                      props.onPostArticleClicked(title, description, content, tags, props.currentSlug );
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
  );
};


const mapStateToProps = ({ currentSlug, currentArticleDetails }) => {
  return { currentSlug, currentArticleDetails };
};

const mapDispatchToProps = dispatch => {
  return {
    onPostArticleClicked: (title, description, content, tags, slug) =>
      dispatch(onPostArticleClicked(title, description, content, tags, slug)),
    loadInitArticleDetail: (slug) => dispatch(loadInitArticleDetail(slug)),
  };
};
export const NewPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalNewPost);
