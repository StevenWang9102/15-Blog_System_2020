import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserInformation } from "../../ReduxStore/FeedDetails/feedSagas";
import { Link, NavLink } from "react-router-dom";
import dateFormat from "dateformat";
import { createUseStyles } from "react-jss";
import {
  loadUserProfileDetail,
  favoritedArticleClicked,
  setProfileNavStatus,
  updatedYourSetting
} from "../../ReduxStore/FeedDetails/feedActions";

// ---------------- React-JSS-Configuration -------------------- //
const useStyles = createUseStyles({
  // 这个是公用的定义
  myButton: {
    "& img": {
      margin: {
        top:2,
        right: 5,
        bottom: 2,
      }
    }
  }
});

// 这个是制定的定义
const Button = ({ children }) => {
  const classes = useStyles(); // 调取公用的定义
  return (
    <button
      className={`btn btn-sm btn-outline-secondary action-btn ${classes.myButton}`}>
      {children}
    </button>
  );
};

// 使用的时候只需要包裹就行了

// ---------------- React-Component -------------------- //
const InternalUserProfile = props => {
  const userName = getUserInformation().username;

  useEffect(() => {
    props.loadUserProfileDetail();
    props.setProfileNavStatus(["active", "null"]);
    props.updatedYourSetting("still");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className='profile-page'>
        {/* ---------------- User Information ---------------- */}
        <div className='user-info'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-md-10 offset-md-1'>
                <img
                  src={
                    props.currentProfileData.profile &&
                    props.currentProfileData.profile.image
                  }
                  className='user-img'
                  alt='au'
                />
                <h4>{userName}</h4>
                <p>
                  {props.currentProfileData.profile &&
                    props.currentProfileData.profile.bio}
                </p>
                <Button>
                  <i className='ion-plus-round'></i>
                  <Link className='nav-link' to='/setting'>
                    <img src='./icon/004-settings.png' alt='setting' />
                    Edit Profile Setting
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              {/* ---------------- Navigation ---------------- */}
              <div className='articles-toggle'>
                <ul className='nav nav-pills outline-active'>
                  <li className='nav-item'>
                    <NavLink
                      to='/user_profile/my_articles'
                      className='nav-link'
                      activeClassName={
                        props.profileNavStatus && props.profileNavStatus[0]
                      }
                      onClick={() => {
                        props.setProfileNavStatus(["active", "null"]);
                        props.loadUserProfileDetail();
                      }}>
                      My Articles
                    </NavLink>
                  </li>

                  <li className='nav-item'>
                    <NavLink
                      to='/user_profile/favorited_articles'
                      className='nav-link'
                      activeClassName={
                        props.profileNavStatus && props.profileNavStatus[1]
                      }
                      onClick={() => {
                        props.setProfileNavStatus(["null", "active"]);
                        props.onFavoritedArticleClicked();
                      }}>
                      Favorited Articles
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* ---------------- Article Area ----------------  */}
              {props.currentDisplayArticle.map((article, index) => {
                return (
                  <div className='article-preview' key={index}>
                    <div className='article-meta'>
                      <Link to={"/user_profile/" + article.author.username}>
                        <img src={article.author.image} alt='au' />
                      </Link>

                      <div className='info'>
                        <Link
                          to={"/user_profile/" + article.author.username}
                          className='author'>
                          {article.author.username}
                        </Link>
                        <span className='date'>
                          {dateFormat(article.updatedAt, "ddd mmm dd yyyy")}
                        </span>
                      </div>
                      <button className='btn btn-outline-primary btn-sm pull-xs-right'>
                        <i className='ion-heart'></i>
                        {article.favoritesCount}
                      </button>
                    </div>

                    <Link
                      to={"/article-detail/" + article.slug}
                      className='preview-link'>
                      <h1>{article.title}</h1>
                      <p>{article.description}</p>
                      <span>Read more...</span>
                    </Link>
                  </div>
                );
              })}
              {props.currentDisplayArticle.length === 0 && (
                <div className='article-preview'>
                  No articles are here... yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InternalUserProfile.propTypes = {
  currentProfileData: PropTypes.object.isRequired,
  currentUsersArticles: PropTypes.array.isRequired,
  loadUserProfileDetail: PropTypes.func.isRequired,
  favoritedArticles: PropTypes.array
};

const mapStateToProps = ({
  currentProfileData,
  currentUsersArticles,
  onFavoritedArticleClicked,
  favoritedArticles,
  profileNavStatus,
  currentDisplayArticle
}) => {
  return {
    currentProfileData,
    currentUsersArticles,
    onFavoritedArticleClicked,
    favoritedArticles,
    profileNavStatus,
    currentDisplayArticle
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserProfileDetail: () => dispatch(loadUserProfileDetail()),
    onFavoritedArticleClicked: () => dispatch(favoritedArticleClicked()),
    setProfileNavStatus: profileNavStatus =>
      dispatch(setProfileNavStatus(profileNavStatus)),
    // updatedYourSetting
    updatedYourSetting: status => dispatch(updatedYourSetting(status))
  };
};

export const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalUserProfile);
