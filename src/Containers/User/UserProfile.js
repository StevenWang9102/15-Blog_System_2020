import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { UserProfileTitle } from "../../Components/User/UserProfileTitle"
import { UserProfileNav } from "../../Components/User/UserProfileNav"
import { UserProfileDisplayArticles } from "../../Components/User/UserProfileDisplayArticles"

import { articleCountDisplay, articleOffSet} from "../../Functions/httpMethods"
import {
  favoritedArticleNavClicked,
  setProfileNavStatus,
  updateSettingStatus,
  favoritedButtonClicked,
  onFollowAuthorClick
} from "../../ReduxStore/Actions/eventActions";
import {
  loadUserProfileDetail,
} from "../../ReduxStore/Actions/userActions";
import { PageTunner } from "../../Components/MainPage/PageTunner";



const InternalUserProfile = props => {
  const [httpMethod, setHttpMethod] = useState({});
  const { author_name } = useParams();
  const { article_type } = useParams();
  

  useEffect(() => {
    props.loadUserProfileDetail(author_name, articleCountDisplay, articleOffSet);
    props.updateSettingStatus("NOT UPDATED");

    if (article_type === "favorited_articles") {
      props.setProfileNavStatus("null", "active");
    } else {
      props.setProfileNavStatus("active", "null");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <div className='profile-page'>
        
        {/* ---------------- User Information ---------------- */}
        <UserProfileTitle
          currentProfileDetail={props.currentProfileDetail}
          author_name = {author_name}
          onFollowAuthorClick={props.onFollowAuthorClick}
        />

        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              {/* ---------------- Navigation ---------------- */}
              <UserProfileNav
                author_name={author_name}
                profileNavStatusLeft={props.profileNavStatusLeft}
                profileNavStatusRight={props.profileNavStatusRight}
                setProfileNavStatus={props.setProfileNavStatus}
                loadUserProfileDetail={props.loadUserProfileDetail}
                onFavoritedArticleNavClicked={props.onFavoritedArticleNavClicked}
              />

              {/* ---------------- Related Article Area ----------------  */}
              <UserProfileDisplayArticles
                httpMethod={httpMethod}
                setHttpMethod={setHttpMethod}
                userInformation={props.userInformation}
                currentProfileDisplayArticle={props.currentProfileDisplayArticle}
                loadUserProfileDetail={props.loadUserProfileDetail}
                onFavoritedArticleClicked={props.onFavoritedArticleClicked}
              />

              {/* --------------------- Switch Page --------------------- */}
              <PageTunner
                fromPage="UserProfile"
                profileNavStatusLeft={props.profileNavStatusLeft}
                loadUserProfileDetail={props.loadUserProfileDetail}
                author_name={author_name}
                articlesAllCount={props.articlesAllCount}
                onFavoritedArticleNavClicked={props.onFavoritedArticleNavClicked}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InternalUserProfile.propTypes = {
  currentProfileDetail: PropTypes.object.isRequired,
  currentUsersArticles: PropTypes.array.isRequired,
  loadUserProfileDetail: PropTypes.func.isRequired,
};

const mapStateToProps = ({ eventReducer, userReducer, articleReducer }) => {
  const { 
    profileNavStatusLeft, 
    profileNavStatusRight,
    onFavoritedArticleNavClicked,
  } = eventReducer;

  const {
    userInformation,
    followAuthorStatus,
    currentProfileDetail,
  } = userReducer;

  const {
    currentUsersArticles,
    currentProfileDisplayArticle,
    articlesAllCount,

  } = articleReducer;

  return {
    userInformation,
    currentProfileDetail,
    currentUsersArticles,
    onFavoritedArticleNavClicked,
    profileNavStatusLeft,
    profileNavStatusRight,
    currentProfileDisplayArticle,
    followAuthorStatus,
    articlesAllCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserProfileDetail: (author_name, articleCountDisplay, articleOffSet) =>
      dispatch(loadUserProfileDetail(author_name, articleCountDisplay, articleOffSet)),
    onFavoritedArticleNavClicked: (author_name, articleCountDisplay, articleOffSet) =>
      dispatch(favoritedArticleNavClicked(author_name, articleCountDisplay, articleOffSet)),
    setProfileNavStatus: (profileNavStatusLeft, profileNavStatusRight) =>
      dispatch(
        setProfileNavStatus(profileNavStatusLeft, profileNavStatusRight)
      ),
    updateSettingStatus: status => dispatch(updateSettingStatus(status)),
    onFavoritedArticleClicked: (token, slug, httpMethod, author_name) =>
      dispatch(favoritedButtonClicked(token, slug, httpMethod, author_name)),
    onFollowAuthorClick: (author_name, method) => dispatch(onFollowAuthorClick(author_name, method)),
  };
};

export const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalUserProfile);
