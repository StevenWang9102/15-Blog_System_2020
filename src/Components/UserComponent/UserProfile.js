import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getUserInformation } from "../../ReduxStore/FeedDetails/feedSagas";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import {
  loadUserProfileDetail,
  favoritedArticleClicked
} from "../../ReduxStore/FeedDetails/feedActions";

const InternalUserProfile = props => {

  const userName = getUserInformation().username || null;

  useEffect(() => {
      userName && props.loadUserProfileDetail(userName);
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
                <button className='btn btn-sm btn-outline-secondary action-btn' type="button"
>
                  <i className='ion-plus-round'></i>
                  <Link className='nav-link' to='/setting'>
                    <img src='./icon/004-settings.png' alt='setting' />
                    Edit Profile Setting
                  </Link>
                </button>
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
                    <Link
                      to='/user_profile/my_articles'
                      className='nav-link active'
                      onClick={() => {
                        props.loadUserProfileDetail(userName);
                      }}>
                      My Articles
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      to='/user_profile/favorited_articles'
                      className='nav-link'
                      onClick={userName => {
                        props.onFavoritedArticleClicked(userName);
                      }}>
                      Favorited Articles
                    </Link>
                  </li>
                </ul>
              </div>

              {/* ---------------- One Article ----------------  */}
              {(props.favoritedArticles || props.currentUsersArticles).map(
                (article, index) => {
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
                        <button className='btn btn-outline-primary btn-sm pull-xs-right' type="button"
>
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
                }
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
  favoritedArticles: PropTypes.array,
  userInfo: PropTypes.object
};

const mapStateToProps = ({
  currentProfileData,
  currentUsersArticles,
  onFavoritedArticleClicked,
  favoritedArticles,
  userInfo
}) => {
  return {
    currentProfileData,
    currentUsersArticles,
    onFavoritedArticleClicked,
    userInfo,
    favoritedArticles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserProfileDetail: userName =>
      dispatch(loadUserProfileDetail(userName)),
    onFavoritedArticleClicked: userName =>
      dispatch(favoritedArticleClicked(userName))
  };
};

export const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalUserProfile);
