import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { UserProfileTitle } from "../../Components/User/UserProfileTitle";
import { FeedsToggle } from "../../Components/MainPage/FeedsToggle";
import { CurrentDisplayArticles } from "../../Components/ArticlePage/CurrentDisplayArticles";
import { displayLimit, offset } from "../../Functions/HttpClient";
import {
  favoritedArticleNavClicked,
  setProfileNavStatus,
  updateSettingStatus,
  onFollowAuthorClick,
  setLoading,
  favoritedButtonClicked
} from "../../ReduxStore/Actions/eventActions";
import { loadUserProfileDetail } from "../../ReduxStore/Actions/userActions";
import { PageTunner } from "../../Components/MainPage/PageTunner";

const InternalUserProfile = props => {
  const { author_name } = useParams();
  const { article_type } = useParams();
  const [httpMethod, setHttpMethod] = useState({});
  const [currentPageOffSet, setCurrentPageOffSet] = useState(0);

  useEffect(() => {
    props.loadUserProfileDetail(author_name, displayLimit, offset);
    props.updateSettingStatus("NOT UPDATED");
    props.setProfileNavStatus("active", "null");

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
          userInformation={props.userInformation}
          author_name={author_name}
          onFollowAuthorClick={props.onFollowAuthorClick}
        />

        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              {/* ---------------- Navigation ---------------- */}

              <FeedsToggle
                onPage="User Profile"
                author_name={author_name}
                setLoading={props.setLoading}
                setProfileNavStatus={props.setProfileNavStatus}
                profileNavStatusLeft={props.profileNavStatusLeft}
                profileNavStatusRight={props.profileNavStatusRight}
                loadUserProfileDetail={props.loadUserProfileDetail}
                onFavoritedArticleNavClicked={props.onFavoritedArticleNavClicked}
              />
              {/* ---------------- Related Article Area ----------------  */}
              <CurrentDisplayArticles
                pageName="User Profile"
                author_name={author_name}
                currentDisplayArticle={props.currentProfileDisplayArticle}
                httpMethod={httpMethod}
                setHttpMethod={setHttpMethod}
                setLoading={props.setLoading}
                setProfileNavStatus={props.setProfileNavStatus}
                currentPageOffSet={currentPageOffSet}
                userInformation={props.userInformation}
                loadUserProfileDetail={props.loadUserProfileDetail}
                onFavoritedArticleClicked={props.onFavoritedArticleClicked}
              />

              {/* --------------------- Switch Page --------------------- */}
              <PageTunner
                fromPage='UserProfile'
                author_name={author_name}
                setCurrentPageOffSet={setCurrentPageOffSet}
                profileNavStatusLeft={props.profileNavStatusLeft}
                loadUserProfileDetail={props.loadUserProfileDetail}
                articlesAllCount={props.articlesAllCount}
                onFavoritedArticleNavClicked={
                  props.onFavoritedArticleNavClicked
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InternalUserProfile.propTypes = {
  author_name: PropTypes.array,
  userInformation: PropTypes.object.isRequired,
  setProfileNavStatus: PropTypes.func.isRequired,
  profileNavStatusLeft: PropTypes.string.isRequired,
  profileNavStatusRight: PropTypes.string.isRequired,
  articlesAllCount: PropTypes.number,
  loadUserProfileDetail: PropTypes.func.isRequired,
  currentProfileDetail: PropTypes.object.isRequired
};

const mapStateToProps = ({ eventReducer, userReducer, articleReducer }) => {
  const {
    profileNavStatusLeft,
    profileNavStatusRight,
    onFavoritedArticleNavClicked
  } = eventReducer;

  const {
    userInformation,
    followAuthorStatus,
    currentProfileDetail
  } = userReducer;

  const { currentProfileDisplayArticle, articlesAllCount } = articleReducer;

  return {
    userInformation,
    currentProfileDetail,
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
    loadUserProfileDetail: (author_name, displayLimit, offset) =>
      dispatch(loadUserProfileDetail(author_name, displayLimit, offset)),
    onFavoritedArticleNavClicked: (author_name, displayLimit, offset) =>
      dispatch(favoritedArticleNavClicked(author_name, displayLimit, offset)),
    setProfileNavStatus: (profileNavStatusLeft, profileNavStatusRight) =>
      dispatch(
        setProfileNavStatus(profileNavStatusLeft, profileNavStatusRight)
      ),
    setLoading: status => dispatch(setLoading(status)),
    updateSettingStatus: status => dispatch(updateSettingStatus(status)),
    onFollowAuthorClick: (author_name, method) =>
      dispatch(onFollowAuthorClick(author_name, method)),
    onFavoritedArticleClicked: (token, slug, httpMethod, currentPageOffSet) =>
      dispatch(
        favoritedButtonClicked(token, slug, httpMethod, currentPageOffSet)
      )
  };
};

export const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalUserProfile);
