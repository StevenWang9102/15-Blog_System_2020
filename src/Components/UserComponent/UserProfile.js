import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { loadUserProfileDetail } from "../../ReduxStore/FeedDetails/feedActions";

const InternalUserProfile = props => {
  const { userName } = useParams();
  console.log(userName);
  console.log(props.currentUsersArticles);

  // 请求1：https://conduit.productionready.io/api/user
  // 请求2：https://conduit.productionready.io/api/profiles/anotherBloke

  // 请求3：https://conduit.productionready.io/api/articles?author=anotherBloke&limit=5&offset=0

  useEffect(() => {
    props.loadUserProfileDetail(userName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div class='profile-page'>
      {/* 用户信息 */}
      <div class='user-info'>
        <div class='container'>
          <div class='row'>
            <div class='col-xs-12 col-md-10 offset-md-1'>
              <img
                src={
                  props.currentProfileData.profile &&
                  props.currentProfileData.profile.image
                }
                class='user-img'
                alt='au'
              />
              <h4>{userName}</h4>
              <p>
                {props.currentProfileData.profile &&
                  props.currentProfileData.profile.bio}
              </p>
              <button class='btn btn-sm btn-outline-secondary action-btn'>
                <i class='ion-plus-round'></i>
                &nbsp; + Follow {userName}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class='container'>
        <div class='row'>
          <div class='col-xs-12 col-md-10 offset-md-1'>
            {/* 副导航 */}
            <div class='articles-toggle'>
              <ul class='nav nav-pills outline-active'>
                <li class='nav-item'>
                  <a class='nav-link active' href=''>
                    My Articles
                  </a>
                </li>
                <li class='nav-item'>
                  <a class='nav-link' href=''>
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>

            {/* 一篇文章,此处需要循环map */}
            {props.currentUsersArticles.map((article,index) => {
              return (
                <div class='article-preview' key={index}>
                  <div class='article-meta'>
                    <a href=''>
                      <img src={article.author.image}
                      alt='au' />
                    </a>
                    <div class='info'>
                      <a href='' class='author'>
                        {article.author.username}
                      </a>
                      <span class='date'> {dateFormat(
                        article.updatedAt,
                        "ddd mmm dd yyyy"
                      )}</span>
                    </div>
                    <button class='btn btn-outline-primary btn-sm pull-xs-right'>
                      <i class='ion-heart'></i> {article.favoritesCount}
                    </button>
                  </div>
                  <a href='#top' class='preview-link'>
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <span>Read more...</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  currentArticleDetails,
  currentProfileData,
  currentUsersArticles
}) => {
  return { currentArticleDetails, currentProfileData, currentUsersArticles };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUserProfileDetail: userName => dispatch(loadUserProfileDetail(userName))
  };
};

export const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(InternalUserProfile);
