import { takeLatest, put, call } from "redux-saga/effects";
import { setUserOnSession } from "../../Components/UserComponent/AuthToken";
import { getUserInfoSagaLocal } from "../getUserInfo";
import {
  fetchDataFromServer,
  postDataToServerAll,
  articleCountDisplay,
  articleOffSet
} from "../httpMethods";

import {
  articleCommentsLoaded,
  currentDisplayArticleLoaded,
  loadGlobalFeeds,
  articleContentLoaded,
  deleteYourArticle
} from "../Actions/articleActions";

import {
  FAVERATED_NAV_CLICKED,
  favoritedArticleLoaded,
  setLoading,
  FAVORITED_BUTTON_CLICKED,
  postedArticleReloaded,
  UPDATE_SETTING_BUTTON_CLICK,
  updateSettingStatus,
  FOLLOW_AUTHOR_CLICKED,
  POST_ARTICLE_CLICKED,
  DELETE_ARTICLE_BUTTON,
  POST_COMMENTS_CLICKED
} from "../Actions/eventActions";

import {
  userProfileDataLoaded,
  userInformationLoaded
} from "../Actions/userActions";

export const eventSaga = function*() {
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
    yield call(postDataToServerAll, token, url, "NothingToPost", message, type);
    yield put(loadGlobalFeeds(articleCountDisplay, articleOffSet));
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
