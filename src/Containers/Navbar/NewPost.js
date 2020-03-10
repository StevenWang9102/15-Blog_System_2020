import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading } from "../../ReduxStore/Actions/eventActions";
import { onPostArticleClicked } from "../../ReduxStore/Actions/eventActions";
import { NewPostForm } from "../../Componnets/Navbar/NewPostForm"
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
                  <NewPostForm
                    title={title}
                    description={description}
                    content={content}
                    tags={tags}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    setContent={setContent}
                    setTags={setTags}
                    currentSlug={props.currentSlug}
                    setLoading={props.setLoading}
                    onPostArticleClicked={props.onPostArticleClicked}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

const mapStateToProps = ({ eventReducer, articleReducer }) => {
  const {
    article_loaded,
  } = eventReducer;

  const {
    currentSlug,
    currentArticleDetails,
    newPosedArticleSlug
  } = articleReducer;

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
