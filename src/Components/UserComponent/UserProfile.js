import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
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


// ---------------- React-Component -------------------- //
const InternalUserProfile = props => {

  // 测试一下刷新情况
  console.log("进入简介页面");
  

  const { author_name } = useParams();

  useEffect(() => {
    props.loadUserProfileDetail(author_name);
    // props.setProfileNavStatus("active", "null"); // navigation status 、
    props.updatedYourSetting("still"); // flag of setting status
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
                <h4>{author_name}</h4>
                <p>
                  {props.currentProfileData && props.currentProfileData.profile &&
                    props.currentProfileData.profile.bio}
                </p>
                <Button>
                  <i className='ion-plus-round'></i>
                  <a className='nav-link'>
                    <img src='./icon/004-settings.png' alt='' />
                    <b>+</b> Follow {author_name} Now
                  </a>
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
                      to={`/user_profile/${author_name }/my_articles`}
                      className='nav-link'
                      activeClassName={props.profileNavStatusLeft}
                      onClick={() => {
                        props.setProfileNavStatus("active", "null");
                        props.loadUserProfileDetail(author_name);
                      }}>
                      My Articles
                    </NavLink>
                  </li>

                  <li className='nav-item'>
                    <NavLink
                      to={`/user_profile/${author_name}/favorited_articles`}
                      className='nav-link'
                      activeClassName={ props.profileNavStatusRight}
                      onClick={() => {
                        props.setProfileNavStatus("null", "active");
                        props.onFavoritedArticleClicked(author_name);
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
  profileNavStatusLeft,
  profileNavStatusRight,
  currentDisplayArticle
}) => {
  return {
    currentProfileData,
    currentUsersArticles,
    onFavoritedArticleClicked,
    favoritedArticles,
    profileNavStatusLeft,
    profileNavStatusRight,
    currentDisplayArticle
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserProfileDetail: (author_name) => dispatch(loadUserProfileDetail(author_name)),
    onFavoritedArticleClicked: (author_name) => dispatch(favoritedArticleClicked(author_name)),
    setProfileNavStatus: (profileNavStatusLeft, profileNavStatusRight) =>
      dispatch(setProfileNavStatus(profileNavStatusLeft, profileNavStatusRight)),
    // updatedYourSetting
    updatedYourSetting: status => dispatch(updatedYourSetting(status))
  };
};

export const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalUserProfile);
