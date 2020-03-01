import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import dateFormat from "dateformat";
import { createUseStyles } from "react-jss";
import {
  loadUserProfileDetail,
  favoritedArticleNavClicked,
  setProfileNavStatus,
  updateSettingStatus,
  favoritedButtonClicked
} from "../../ReduxStore/FeedDetails/feedActions";

// ---------------- React-JSS-Configuration -------------------- //
const useStyles = createUseStyles({
  // Public Style
  myButton: {
    "& img": {
      margin: {
        top: 2,
        right: 5,
        bottom: 2
      }
    }
  }
});

const Button = ({ children }) => {
  // Custumized Styles
  const classes = useStyles();
  return (
    <button
      className={`btn btn-sm btn-outline-secondary action-btn ${classes.myButton}`}>
      {children}
    </button>
  );
};

// ---------------- React-Component -------------------- //
const InternalUserProfile = props => {
  const [httpMethod, setHttpMethod] = useState({});
  const { author_name } = useParams();
  const { article_type } = useParams();

  useEffect(() => {
    props.loadUserProfileDetail(author_name);
    props.updateSettingStatus("not updated");
    // 更新是否改动setting的

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
        <div className='user-info'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-md-10 offset-md-1'>
                <img
                  src={
                    props.currentProfileDetail.profile &&
                    props.currentProfileDetail.profile.image
                  }
                  className='user-img'
                  alt='au'
                />
                <h4>{author_name}</h4>
                <p>
                  {props.currentProfileDetail &&
                    props.currentProfileDetail.profile &&
                    props.currentProfileDetail.profile.bio}
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
                      to={`/user_profile/${author_name}/my_articles`}
                      className={`nav-link ${props.profileNavStatusLeft}`}
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
                      className={`nav-link ${props.profileNavStatusRight}`}
                      onClick={() => {
                        props.setProfileNavStatus("null", "active");
                        props.onFavoritedArticleNavClicked(author_name);
                      }}>
                      Favorited Articles
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* ---------------- Related Article Area ----------------  */}
              {props.currentProfileDisplayArticle.map((article, index) => {
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
                      <button
                        className='btn btn-outline-primary btn-sm pull-xs-right'
                        onClick={() => {
                          const tempMethod = { ...httpMethod };
                          if (tempMethod[article.slug] === "DELETE") {
                            tempMethod[article.slug] = "POST";
                          } else {
                            tempMethod[article.slug] = "DELETE";
                          }
                          const token = props.userInformation.token;
                          token &&
                            props.onFavoritedButtonClicked(
                              token,
                              article.slug,
                              tempMethod[article.slug],
                              author_name
                            );
                          setHttpMethod(tempMethod);
                        }}>
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
              {props.currentProfileDisplayArticle.length === 0 && (
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
  currentProfileDetail: PropTypes.object.isRequired,
  currentUsersArticles: PropTypes.array.isRequired,
  loadUserProfileDetail: PropTypes.func.isRequired,
  favoritedArticles: PropTypes.array
};

const mapStateToProps = ({ syncReducer, asyncReducer }) => {
  const { profileNavStatusLeft, profileNavStatusRight } = syncReducer;

  const {
    userInformation,
    currentProfileDetail,
    currentUsersArticles,
    onFavoritedArticleNavClicked,
    favoritedArticles,
    currentProfileDisplayArticle
  } = asyncReducer;

  return {
    userInformation,
    currentProfileDetail,
    currentUsersArticles,
    onFavoritedArticleNavClicked,
    favoritedArticles,
    profileNavStatusLeft,
    profileNavStatusRight,
    currentProfileDisplayArticle
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserProfileDetail: author_name =>
      dispatch(loadUserProfileDetail(author_name)),
    onFavoritedArticleNavClicked: author_name =>
      dispatch(favoritedArticleNavClicked(author_name)),
    setProfileNavStatus: (profileNavStatusLeft, profileNavStatusRight) =>
      dispatch(
        setProfileNavStatus(profileNavStatusLeft, profileNavStatusRight)
      ),
    updateSettingStatus: status => dispatch(updateSettingStatus(status)),
    onFavoritedButtonClicked: (token, slug, httpMethod, author_name) =>
      dispatch(favoritedButtonClicked(token, slug, httpMethod, author_name))
  };
};

export const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalUserProfile);
