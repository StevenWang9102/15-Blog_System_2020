import { takeLatest, put, call } from "redux-saga/effects";
import { getUserInfoSagaLocal } from "../../Functions/getUserInfo"
import { fetchDataFromServer, postDataToServerAll } from "../../Functions/httpMethods"

import {
  LOAD_GLOBAL_FEEDS,
  LOAD_INIT_ARTICLE_DETAIL,
  POPULAR_TAG_CLICKED,
  LOAD_ARTICLE_SETTING_DETAIL,
  articleDataLoaded,
  articleCommentsLoaded,
  tagRelatedArticleLoaded,
  tagsDataLoaded,
  LOAD_POPULAR_TAGS,
  articleSettingContentLoaded,
  articleContentLoaded,
  LOAD_YOUR_FEED,
  currentHomeDisplayArticleLoaded,
} from "../Actions/articleActions";

import {setLoading} from "../Actions/eventActions";

export const articleSaga = function*(){

// GLOBAL_FEEDS_LOADED
yield takeLatest(LOAD_GLOBAL_FEEDS, function*(action) {
    const initArticData = yield call(
      fetchDataFromServer,
      `/articles?limit=${action.articleCountDisplay}&offset=${action.articleOffSet}`,
      "Load Global Feeds"
    );
    yield put(articleDataLoaded(initArticData));
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
}