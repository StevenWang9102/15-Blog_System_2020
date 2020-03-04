import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  // getUserFromSession,
  setUserOnSession
} from "../../Components/UserComponent/AuthToken";
import { getUserInfoSagaLocal } from "../getUserInfo"
import { fetchDataFromServer, postDataToServerAll, articleCountDisplay, articleOffSet} from "../httpMethods"

import {
  // --------------- GET -------------------
  LOAD_GLOBAL_FEEDS,
  LOAD_INIT_ARTICLE_DETAIL,
  POPULAR_TAG_CLICKED,
  LOAD_ARTICLE_SETTING_DETAIL,
  articleDataLoaded,
  articleCommentsLoaded,
  tagRelatedArticleLoaded,
  LOADED_USER_PROFILE,
  userProfileDataLoaded,
  tagsDataLoaded,
  userRelatedArticlesLoaded,
  FAVERATED_NAV_CLICKED,
  LOAD_POPULAR_TAGS,
  articleSettingContentLoaded,
  favoritedArticleLoaded,
  POST_COMMENTS_CLICKED,
  currentDisplayArticleLoaded,
  setLoading,
  // ----------------- POST ------------------
  signUpUserLoaded,
  SIGN_UP_BUTTON_CLICK,
  loadGlobalFeeds,
  articleContentLoaded,
  SIGN_IN_BUTTON_CLICKED,
  userInformationLoaded,
  LOAD_YOUR_FEED,
  FAVORITED_BUTTON_CLICKED,
  setHomeNavStatus,
  postedArticleReloaded,
  currentHomeDisplayArticleLoaded,
  deleteYourArticle,
  UPDATE_SETTING_BUTTON_CLICK,
  updateSettingStatus,
  DELETE_ARTICLE_BUTTON,
  FOLLOW_AUTHOR_CLICKED,
} from "./loadActions";
import {  POST_ARTICLE_CLICKED, } from "./displayActions"


export const postSaga = function*(){
  
  // ------------------------------ GET SAGA --------------------
  // GLOBAL_FEEDS_LOADED
  yield takeLatest(LOAD_GLOBAL_FEEDS, function*(action) {
    const initArticData = yield call(
      fetchDataFromServer,
      `/articles?limit=${action.articleCountDisplay}&offset=${action.articleOffSet}`,
      "Load Global Feeds"
    );

    yield put(articleDataLoaded(initArticData, "loaded"));
    yield put(setLoading("LOADED"));

  });

  // LOAD_POPULAR_TAGS
  yield takeLatest(LOAD_POPULAR_TAGS, function*() {
    const initTagData = yield call(
      fetchDataFromServer,
      "/tags",
      "Load Popular Tags"
    );
    
    yield put(tagsDataLoaded(initTagData["tags"]));
    yield put(setLoading("LOADED"));
  });

  // ARTICLE_DETAILS_LOADED
  yield takeLatest(LOAD_INIT_ARTICLE_DETAIL, function*(action) {
    const initArticleData = yield call(
      fetchDataFromServer,
      `/articles/${action.slug}`,
      "Load Article"
    );
    yield put(articleContentLoaded(initArticleData.article));
    yield put(setLoading("LOADED"));
  });

  // LOAD_ARTICLE_SETTING_DETAIL
  yield takeLatest(LOAD_ARTICLE_SETTING_DETAIL, function*(action) {
    const initArticleData = yield call(
      fetchDataFromServer,
      `/articles/${action.slug}`,
      "Load Article Setting"
    );
    yield put(articleSettingContentLoaded(initArticleData.article));
  });

  // ARTICLE_COMMENT_LOADED
  yield takeLatest(LOAD_INIT_ARTICLE_DETAIL, function*(action) {
    const initCommentData = yield call(
      fetchDataFromServer,
      `/articles/${action.slug}/comments`,
      "Load Article Comments"
    );

    yield put(articleCommentsLoaded(initCommentData));
  });

  // POST_COMMENTS_CLICKED
  yield takeLatest(POST_COMMENTS_CLICKED, function*(action) {
    const token = getUserInfoSagaLocal().token;
    const url = `/articles/${action.slug}/comments`;
    const message = "Post My Comments";
    const postData = {};
    postData.comment = { body: `${action.myComment}` };
    yield call(postDataToServerAll, token, url, postData, message, "POST");

    const initCommentData = yield call(
      fetchDataFromServer,
      `/articles/${action.slug}/comments`
    );
    yield put(articleCommentsLoaded(initCommentData));
  });

  // POPULAR_TAG_CLICKED
  yield takeLatest(POPULAR_TAG_CLICKED, function*(action) {
    const tagRelatedData = yield call(
      fetchDataFromServer,
      `/articles?tag=${action.tagName}&limit=10&offset=0`,
      "Load Popular Tags"
    );
    yield put(tagRelatedArticleLoaded(tagRelatedData.articles));
    yield put(setLoading("LOADED"));
  });

  // LOADED_USER_PROFILE
  yield takeLatest(LOADED_USER_PROFILE, function*(action) {    
    const token = getUserInfoSagaLocal().token;
    const userName = action.author_name;
    const [userProfileData, userRelatedArticles] = yield all([

      call(postDataToServerAll, 
        token, 
        `/profiles/${userName}`, "NothingToPost", 
        "Load User Profile",
        "GET"
        ),
      call(
        fetchDataFromServer,
        `/articles?author=${userName}&limit=${action.articleCountDisplay}&offset=${action.articleOffSet}`,
        "Load User Articles"
      )
    ]);
    
    // need clean ...
    yield put(userProfileDataLoaded(userProfileData.profile));
    yield put(userRelatedArticlesLoaded(userRelatedArticles));
    yield put(currentDisplayArticleLoaded(userRelatedArticles.articles));
    yield put(setLoading("LOADED"));
  });

  // FAVERATED_NAV_CLICKED
  yield takeLatest(FAVERATED_NAV_CLICKED, function*(action) {
    const userName = action.author_name;
    const favoritedArticlesData = yield call(
      fetchDataFromServer,
      `/articles?favorited=${userName}&limit=${action.articleCountDisplay}&offset=${action.articleOffSet}`,
      "Load Your Favorited Articles"
    );

    yield put(favoritedArticleLoaded(favoritedArticlesData));
    yield put(currentDisplayArticleLoaded(favoritedArticlesData.articles));
  });

  // FAVORITED_BUTTON_CLICKED
  yield takeLatest(FAVORITED_BUTTON_CLICKED, function*(action) {
    const slug = action.slug;
    const token = action.token;
    const url = `/articles/${slug}/favorite`;
    const message = "Post Favoriated Articles";
    const type = action.httpMethod;
    yield call(
      postDataToServerAll,
      token,
      url,
      "NothingToPost",
      message,
      type
    );
    yield put(loadGlobalFeeds(articleCountDisplay, articleOffSet));
  });

// ------------------------------ POST SAGA --------------------

  // SIGN_IN_BUTTON_CLICKED
  yield takeLatest(SIGN_IN_BUTTON_CLICKED, function*(action) {
    const userData = {};
    const url = "/users/login";
    const message = "Sign in";
    
    userData.email = action.email;
    userData.password = action.password;

    const postData = { user: userData };
    const userPostedData = yield call(
      postDataToServerAll,
      null,
      url,
      postData,
      message,
      "POST"
    );

    if(!userPostedData) alert("Login fail！Check username and password");
    if(userPostedData) setUserOnSession(userPostedData.user);

    yield put(userInformationLoaded(userPostedData));
    yield put(setHomeNavStatus("active", "null", "null"));
    yield put(setLoading("LOADED"));
  });

  // LOAD_YOUR_FEED
  yield takeLatest(LOAD_YOUR_FEED, function*(action) {
    const token = getUserInfoSagaLocal().token;
    const url = `/articles/feed?limit=${action.articleCountDisplay}&offset=${action.articleOffSet}`;
    const message = "Load Your Feed";
    const yourArticleData = yield call(
      postDataToServerAll,
      token,
      url,
      "NothingToPost",
      message,
      "GET"
    );
    yield put(currentHomeDisplayArticleLoaded(yourArticleData));
    yield put(setLoading("LOADED"));
  });

  // POST_ARTICLE_CLICKED
  yield takeLatest(POST_ARTICLE_CLICKED, function*(action) {
    const token = getUserInfoSagaLocal().token;
    let url,
      type = "";
    const postData = {};
    const message = "Post an Article";

    if (action.slug) {
      type = "PUT";
      url = `/articles/${action.slug}`;
    } else {
      type = "POST";
      url = "/articles";
    }

    postData.article = {
      title: `${action.title}`,
      description: `${action.description}`,
      body: `${action.content}`,
      tagList: `${action.tags}`
    };

    const yourArticle = yield call(
      postDataToServerAll,
      token,
      url,
      postData,
      message,
      type
    );

    // need clean?
    yield put(articleContentLoaded(yourArticle.article));
    yield put(articleCommentsLoaded(yourArticle));
    yield put(postedArticleReloaded(true));
    yield put(setLoading("LOADED"));
  });

  // SIGN_UP_BUTTON_CLICK
  yield takeLatest(SIGN_UP_BUTTON_CLICK, function*(action) {
    const token = null;
    const url = "/users";
    const postData = {};
    const message = "Sign Up";
    postData.user = {
      username: `${action.userName}`,
      email: `${action.email}`,
      password: `${action.password}`
    };
    const signUpUser = yield call(
      postDataToServerAll,
      token,
      url,
      postData,
      message,
      "POST"
    );
    setUserOnSession(signUpUser.user);
    yield put(userInformationLoaded(signUpUser));
    yield put(signUpUserLoaded(signUpUser));
  });

  // UPDATE_SETTING_BUTTON_CLICK
  yield takeLatest(UPDATE_SETTING_BUTTON_CLICK, function*(action) {
    const token = getUserInfoSagaLocal().token;
    const url = "/user";
    const message = "Update User Setting";
    const postData = action.request;
    const userSetting = yield call(
      postDataToServerAll,
      token,
      url,
      postData,
      message,
      "PUT"
    );    
    setUserOnSession(userSetting.user);
    yield put(updateSettingStatus("UPDATED"));
    yield put(userInformationLoaded(userSetting.user));
  });

  // DELETE_ARTICLE_BUTTON
  yield takeLatest(DELETE_ARTICLE_BUTTON, function*(action) {
    const token = getUserInfoSagaLocal().token;
    const url = `/articles/${action.slug}`;
    const message = "Delete Article";
    const postData = "NothingToPost";
    const deleteArticle = yield call(
      postDataToServerAll,
      token,
      url,
      postData,
      message,
      "DELETE"
    );
    yield put(deleteYourArticle(deleteArticle));
  });

  // FOLLOW_AUTHOR_CLICKED
  yield takeLatest(FOLLOW_AUTHOR_CLICKED, function*(action) {
    const token = getUserInfoSagaLocal().token;
    const url = `/profiles/${action.author_name}/follow`;
    const message = 'Follow  Author';
    const postData = "NothingToPost";
    const followAuthor = yield call(
      postDataToServerAll,
      token,
      url,
      postData,
      message,
      action.method
    );

    yield put(userProfileDataLoaded(followAuthor.profile));
  });
};


