import { takeLatest, put, call } from "redux-saga/effects";
import {
  INITIALDATA_LOADED,
  INIT_ARTICLE_COMMENT_GET,
  articleDataLoaded,
  articleContentLoaded,
  articleCommentsLoaded,
  tagsDataLoaded
} from "./feedActions";

export const feedSaga = function*() {
  yield takeLatest(INITIALDATA_LOADED, function*() {
    // load all articles
    const initArticData = yield call(
      fetchInitialData,
      "/articles?limit=50&offset=10"
    );

    yield put(articleDataLoaded(initArticData["articles"]));
    // load popular tages
    const initTagData = yield call(fetchInitialData, "/tags");
    yield put(tagsDataLoaded(initTagData["tags"]));
  });
  yield takeLatest(INIT_ARTICLE_COMMENT_GET, function*(slug) {
    // 文章请求
    const initArticleData = yield call(fetchInitialData, `/articles/${slug.slug}`);
    yield put(articleContentLoaded(initArticleData.article));
    
    // 评论请求
    const initCommentData = yield call(fetchInitialData, `/articles/${slug.slug}/comments`);
    yield put(articleCommentsLoaded(initCommentData));
  });
};

const fetchInitialData = url => {
  return fetch("https://conduit.productionready.io/api" + url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("--- get data failed ---");
      }
    })
};
