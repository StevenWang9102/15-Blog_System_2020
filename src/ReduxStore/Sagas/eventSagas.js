import { takeLatest, put, call,select } from "redux-saga/effects";
import { setUserOnSession } from "../../Functions/AuthToken";
import { getUserInfoSagaLocal } from "../../Functions/getUserInfo"
import {
  fetchDataFromServer,
  postDataToServerAll,
} from "../../Functions/httpMethods";

import {
  articleCommentsLoaded,
  currentDisplayArticleLoaded,
  articleContentLoaded,
  deleteYourArticle
} from "../Actions/articleActions";

import {
  FAVERATED_NAV_CLICKED,
  setLoading,
  FAVORITED_BUTTON_CLICKED,
  postedArticleReloaded,
  UPDATE_SETTING_BUTTON_CLICK,
  updateSettingStatus,
  FOLLOW_AUTHOR_CLICKED,
  POST_ARTICLE_CLICKED,
  DELETE_ARTICLE_BUTTON,
  POST_COMMENTS_CLICKED,
  setHomeNavStatus
} from "../Actions/eventActions";

import {
  userProfileDataLoaded,
  userInformationLoaded
} from "../Actions/userActions";

export const eventSaga = function*() {
  
  // POST_ARTICLE_CLICKED
  yield takeLatest(POST_ARTICLE_CLICKED, function*(action) {
    const state = yield select();   
    const token = getUserInfoSagaLocal(state).token;    

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

    yield put(articleContentLoaded(yourArticle.article));
    yield put(articleCommentsLoaded(yourArticle));
    yield put(postedArticleReloaded("LOADED"));
    yield put(setLoading("LOADED"));
  });

  // POST_COMMENTS_CLICKED
  yield takeLatest(POST_COMMENTS_CLICKED, function*(action) {
    const state = yield select();   
    const token = getUserInfoSagaLocal(state).token;    
    
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

    yield put(currentDisplayArticleLoaded(favoritedArticlesData));
    yield put(setLoading("LOADED"));

  });

  // FAVORITED_BUTTON_CLICKED
  yield takeLatest(FAVORITED_BUTTON_CLICKED, function*(action) {
    console.log(action);
    
    const slug = action.slug;
    const token = action.token;
    const url = `/articles/${slug}/favorite`;
    const message = "Post Favoriated Articles";
    const type = action.httpMethod;
    yield call(postDataToServerAll, token, url, "NothingToPost", message, type);
    yield put(setLoading("LOADED"));
  });

  // UPDATE_SETTING_BUTTON_CLICK
  yield takeLatest(UPDATE_SETTING_BUTTON_CLICK, function*(action) {

    const state = yield select();   
    const token = getUserInfoSagaLocal(state).token;    
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
    console.log(userSetting.user);
    
    setUserOnSession(userSetting.user);
    yield put(userInformationLoaded(userSetting.user));
    yield put(updateSettingStatus("UPDATED"));
  });

  // DELETE_ARTICLE_BUTTON
  yield takeLatest(DELETE_ARTICLE_BUTTON, function*(action) {

    const state = yield select();   
    const token = getUserInfoSagaLocal(state).token;    
    const url = `/articles/${action.slug}`;
    const message = "Delete Article";
    const postData = "NothingToPost";
    yield call(
      postDataToServerAll,
      token,
      url,
      postData,
      message,
      "DELETE"
    );    
    yield put(deleteYourArticle("DELETED"));
  });

  // FOLLOW_AUTHOR_CLICKED
  yield takeLatest(FOLLOW_AUTHOR_CLICKED, function*(action) {
    const state = yield select();   
    const token = getUserInfoSagaLocal(state).token;    

    const url = `/profiles/${action.author_name}/follow`;
    const message = "Follow  Author";
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
