import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ArticleComments } from "./ArticleComments";
import { Route, Redirect } from "react-router-dom";
import { loadInitArticleDetail } from "../../ReduxStore/Actions/articleActions";
import {
  onDeleteArticleClicked,
  onEditArticleClicked
} from "../../ReduxStore/Actions/eventActions";
import { saveUserInformationToStore } from "../../ReduxStore/Actions/userActions";
import { EditButton } from "../../Componnets/ArticlePage/EditButton";
import { SignInOptions } from "../../Componnets/ArticlePage/SignInOptions";
import { ArticleTitle } from "../../Componnets/ArticlePage/ArticleTitle";
import { ArticleContent } from "../../Componnets/ArticlePage/ArticleContent";

const InternalArticleDetails = props => {
  const { article_slug } = useParams();

  const isAuthorized = () => {
    if (props.userInformation) {
      return (
        props.userInformation.username ===
        props.currentArticleDetails.author.username
      );
    }
  };

  useEffect(() => {
    props.loadInitArticleDetail(article_slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Route>
      {props.deleteYourArticleStatus ? (
        <Redirect to='/home' />
      ) : (
        <div className='article-page'>
          <div className='banner'>
            <div className='container'>
              {/* ------------------ Article Title  ------------------ */}
              {props.currentArticleDetails.author && (
                <ArticleTitle
                  currentArticleDetails={props.currentArticleDetails}
                />
              )}

              {props.currentArticleDetails.author && isAuthorized() && (
                <EditButton
                  article_slug={article_slug}
                  onEditArticleClicked={props.onEditArticleClicked}
                  onDeleteArticleClicked={props.onDeleteArticleClicked}
                />
              )}
            </div>
          </div>

          {/* -------- Article Details -------- */}
          <ArticleContent currentArticleDetails={props.currentArticleDetails} />

          {/* -------- Sign In Options -------- */}
          {!props.userInformation.token && <SignInOptions />}

          {/* -------- Comments -------- */}
          {props.userInformation.token && <ArticleComments />}
        </div>
      )}
    </Route>
  );
};

InternalArticleDetails.propTypes = {
  currentArticleDetails: PropTypes.object.isRequired
};

const mapStateToProps = ({ eventReducer, userReducer, articleReducer }) => {
  const { deleteYourArticleStatus } = eventReducer;

  const { userInformation } = userReducer;

  const { currentArticleDetails } = articleReducer;

  return {
    currentArticleDetails,
    userInformation,
    deleteYourArticleStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadInitArticleDetail: slug => dispatch(loadInitArticleDetail(slug)),
    onEditArticleClicked: flag => dispatch(onEditArticleClicked(flag)),
    onDeleteArticleClicked: slug => dispatch(onDeleteArticleClicked(slug)),
    saveUserInformationToStore: userInformation =>
      dispatch(saveUserInformationToStore(userInformation))
  };
};

export const ArticleDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticleDetails);
