import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ArticleComments } from "./ArticleComments";
import { Route, Redirect } from "react-router-dom";
import { loadInitArticleDetail } from "../../ReduxStore/Actions/articleActions";
import {
  onDeleteArticleClicked,
  onEditArticleClicked,
  setLoading
} from "../../ReduxStore/Actions/eventActions";
import { saveUserInformationToStore } from "../../ReduxStore/Actions/userActions";
import { EditButton } from "../../Components/ArticlePage/EditButton";
import { SignInOptions } from "../../Components/ArticlePage/SignInOptions";
import { ArticleTitle } from "../../Components/ArticlePage/ArticleTitle";
import { ArticleContent } from "../../Components/ArticlePage/ArticleContent";

const InternalArticleDetails = props => {
  const { article_slug } = useParams();
  const isUserExist = props.userInformation.token;

  const isAuthorized = () => {
    if (props.currentArticleDetails.author && props.userInformation)
      return (
        props.userInformation.username ===
        props.currentArticleDetails.author.username
      );
  };

  useEffect(() => {
    props.loadInitArticleDetail(article_slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Route>
      {props.deleteArticleDone === "DELETED" ? (
        <Redirect to='/home' />
      ) : (
        <div className='article-page'>
          <div className='banner'>
            <div className='container'>
              {/* ------------------ Article Title  ------------------ */}
              <h1>{props.currentArticleDetails.title}</h1>
              <div className='article-meta article-source'>
                <ArticleTitle
                  onPage="Article Details"
                  setLoading={props.setLoading}
                  article={props.currentArticleDetails}
                />
              </div>
              {isAuthorized() && (
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

          {/* -------- Sign In Options OR Comments -------- */}
          {isUserExist ? <ArticleComments /> : <SignInOptions />}
        </div>
      )}
    </Route>
  );
};

InternalArticleDetails.propTypes = {
  userInformation: PropTypes.object,
  currentArticleDetails: PropTypes.object.isRequired,
  article_slug: PropTypes.array,
  onEditArticleClicked: PropTypes.func,
  onDeleteArticleClicked: PropTypes.func
};

const mapStateToProps = ({ userReducer, articleReducer }) => {
  const { userInformation } = userReducer;

  const { currentArticleDetails, deleteArticleDone } = articleReducer;

  return {
    currentArticleDetails,
    userInformation,
    deleteArticleDone
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadInitArticleDetail: slug => dispatch(loadInitArticleDetail(slug)),
    onEditArticleClicked: flag => dispatch(onEditArticleClicked(flag)),
    onDeleteArticleClicked: slug => dispatch(onDeleteArticleClicked(slug)),
    saveUserInformationToStore: userInformation =>
      dispatch(saveUserInformationToStore(userInformation)),
    setLoading: status => dispatch(setLoading(status))
  };
};

export const ArticleDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalArticleDetails);
