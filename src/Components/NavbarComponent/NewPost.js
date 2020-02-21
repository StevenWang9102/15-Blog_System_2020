import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { onPostArticleClicked, loadInitArticleDetail } from "../../ReduxStore/FeedDetails/feedActions";

const InternalNewPost = props => {
  const [title, setTitle] = useState(props.currentArticleDetails.title);
  const [description, setDescription] = useState(props.currentArticleDetails.description);
  const [content, setContent] = useState(props.currentArticleDetails.body);
  const [tags, setTags] = useState(props.currentArticleDetails.tagList);
  // tagList

// 从哪里拿到这篇文章的slug， 应该是内存
const { slug } = useParams();

// 发送请求这篇文章的内容
console.log(props.currentArticleDetails);

// 

useEffect(() => {
  props.loadInitArticleDetail(slug);
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
                      value= {title}
                      placeholder='Article Title'></input>
                  </fieldset>

                  {/* ---- Description ---- */}
                  <fieldset class='form-group'>
                    <input
                      type='text'
                      class='form-control'
                      value= {description}
                      onChange={event => setDescription(event.target.value)}
                      placeholder="What's this article about?"></input>
                  </fieldset>

                  {/* ---- Content ---- */}
                  <fieldset class='form-group'>
                    <textarea
                      class='form-control'
                      rows='8'
                      value= {content}
                      onChange={event => setContent(event.target.value)}
                      placeholder='Write your article (in markdown)'></textarea>
                  </fieldset>

                  {/* ---- Tags ---- */}
                  <fieldset class='form-group'>
                    <input
                      type='text'
                      class='form-control'
                      value= {tags && tags.join(',')}
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
