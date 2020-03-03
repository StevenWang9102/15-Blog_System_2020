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
  favoritedButtonClicked,
  onFollowAuthorClick
} from "../../ReduxStore/FeedDetails/feedActions";

// ------------------------- JSS -----------------------
const useStyles = createUseStyles({
  myButton: {
    border: '0px',
    padding: '0px',
  },
  '& a': {
    height: '5px',
    width: '5px',
  }
});

const InternalUserProfile = props => {
  
  const Page = ({ children }) => {
    const classes = useStyles();
    return (
      <button
        className={`page-item ${classes.myButton}`}>
        {children}
      </button>
    );
  };
  
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

  // ------------------------- Component -----------------------
  const [httpMethod, setHttpMethod] = useState({});
  const { author_name } = useParams();
  const { article_type } = useParams();
  
  console.log(author_name);

  const articleCountDisplay = 5
  const articleOffSet = 0
  const pageNumber = Math.round(props.articleCount / articleCountDisplay)

  const myPageNumArray = []
  for (let i = 1; i <= pageNumber; i++) {
    myPageNumArray.push(i)
  }

  useEffect(() => {
    // 从别处转移过来的时候，用户名没有及时更新
    // 好像只是页面跳转，但是没有发送请求？
    props.loadUserProfileDetail(author_name, articleCountDisplay, articleOffSet);
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
                    props.currentProfileDetail &&
                    props.currentProfileDetail.image
                  }
                  className='user-img'
                  alt='au'
                />
                <h4>{author_name}</h4>
                <p>
                  {props.currentProfileDetail &&
                    props.currentProfileDetail.bio}
                </p>
                <Button>
                  <i className='ion-plus-round'></i>
                  <a
                    className='nav-link'
                    onClick={() => {
                      if (props.currentProfileDetail.following === false)
                        props.onFollowAuthorClick(author_name, "POST")
                      else
                        props.onFollowAuthorClick(author_name, "DELETE");
                    }}>
                    <img src='./icon/004-settings.png' alt='' />
                    {/* {props.currentProfileDetail.following} */}
                    {/* {props.currentProfileDetail.following} */}
                    {props.currentProfileDetail.following ? `- Unfollow ${author_name}` : `+ Follow ${author_name} Now`}
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
                        props.loadUserProfileDetail(author_name, articleCountDisplay, articleOffSet);
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
                        props.onFavoritedArticleNavClicked(author_name, articleCountDisplay, articleOffSet);
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
                        {/* 
                            // 目前只是链接过去了
                            // 但是似乎没有重新请求吧
                            // 似乎此时的作者名字不对
                            // 应该请求并且渲染页面
                            // 好像目前页面内容还是不对劲
                            // 点击玩作者之后，在点击Nav为啥又不能找到我自己的内容了。。。

                            */}
                        <Link
                          to={"/user_profile/" + article.author.username}
                          className='author'
                          onClick={()=>props.loadUserProfileDetail(article.author.username, articleCountDisplay, articleOffSet)}
                          >
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
              {/* --------------------- Page Tunner --------------------- */}
              <nav>
                <ul class="pagination">

                  {myPageNumArray.map((pageNumber, index) => {
                    const articleOffSet = index * articleCountDisplay
                    return (<Page>
                      <a
                        class="page-link"
                        href={`#p${pageNumber}`}
                        onClick={() => {
                          if (props.profileNavStatusLeft === "active")
                            props.loadUserProfileDetail(author_name, articleCountDisplay, articleOffSet)
                          else props.onFavoritedArticleNavClicked(author_name, articleCountDisplay, articleOffSet)
                        }}
                      > {pageNumber} </a>
                    </Page>)
                  })}

                </ul>
              </nav>
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
    currentProfileDisplayArticle,
    followAuthorStatus,
    articleCount
  } = asyncReducer;

  return {
    userInformation,
    currentProfileDetail,
    currentUsersArticles,
    onFavoritedArticleNavClicked,
    favoritedArticles,
    profileNavStatusLeft,
    profileNavStatusRight,
    currentProfileDisplayArticle,
    followAuthorStatus,
    articleCount
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
    onFavoritedButtonClicked: (token, slug, httpMethod, author_name) =>
      dispatch(favoritedButtonClicked(token, slug, httpMethod, author_name)),
    onFollowAuthorClick: (author_name, method) => dispatch(onFollowAuthorClick(author_name, method)),
  };
};

export const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalUserProfile);
