import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { onPostArticleClicked } from "../../ReduxStore/Actions/eventActions";
import { NewPostForm } from "../../Components/Navbar/NewPostForm"
import PropTypes from "prop-types";

const InternalNewPost = props => {
  const { slug } = useParams();

  // Using slug, we can know this component is "New Post" or "Editting Post"
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
      {props.postArticleLoaded === "LOADED" ?
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

InternalNewPost.propTypes = {
  currentArticleDetails: PropTypes.object,
  newPosedArticleSlug: PropTypes.string,
};


const mapStateToProps = ({ eventReducer, articleReducer }) => {
  const {
    postArticleLoaded,
  } = eventReducer;

  const {
    currentSlug,
    currentArticleDetails,
    newPosedArticleSlug
  } = articleReducer;

  return {
    currentSlug,
    currentArticleDetails,
    postArticleLoaded,
    newPosedArticleSlug
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPostArticleClicked: (title, description, content, tags, slug) =>
      dispatch(onPostArticleClicked(title, description, content, tags, slug))
  };
};
export const NewPost = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalNewPost);
