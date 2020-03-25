import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { onPostCommentsClicked } from "../../ReduxStore/Actions/eventActions";
import { YourComments } from "../../Components/ArticlePage/YourComments";
import { PublicComments } from "../../Components/ArticlePage/PublicComments";

const InternalArticleComments = props => {
  const [myComment, setMyComment] = useState("");

  return (
    <div className='commonts-container'>
      <YourComments
        userInformation={props.userInformation}
        currentSlug={props.currentSlug}
        myComment={myComment}
        setMyComment={setMyComment}
        onPostCommentsClicked={props.onPostCommentsClicked}
      />

      <PublicComments currentComments={props.currentComments} />
    </div>
  );
};

InternalArticleComments.propTypes = {
  currentComments: PropTypes.object.isRequired,
  userInformation: PropTypes.object.isRequired,
  currentSlug: PropTypes.string,
  myComment: PropTypes.array,
  setMyComment: PropTypes.func,
  onPostCommentsClicked: PropTypes.func
};

const mapStateToProps = ({ articleReducer, userReducer }) => {
  const { currentComments, currentSlug } = articleReducer;
  const { userInformation } = userReducer;

  return {
    currentComments,
    currentSlug,
    userInformation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPostCommentsClicked: (slug, myComment) =>
      dispatch(onPostCommentsClicked(slug, myComment))
  };
};

export const ArticleComments = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticleComments);
