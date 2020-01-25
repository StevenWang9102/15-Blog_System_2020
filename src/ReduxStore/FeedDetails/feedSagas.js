import { takeLatest, put, call } from "redux-saga/effects";
import {
  INITIALDATA_LOADED,
  INIT_ARTICLE_COMMENT_GET,
  POPULAR_TAG_CLICKED,
  articleDataLoaded,
  articleContentLoaded,
  articleCommentsLoaded,
  tagRelatedArticleLoaded,
  tagsDataLoaded
} from "./feedActions";

export const feedSaga = function*() {
  
  // 初始数据
  yield takeLatest(INITIALDATA_LOADED, function*() {
    const initArticData = yield call(
      fetchInitialData,
      "/articles?limit=50&offset=10"
    );
    yield put(articleDataLoaded(initArticData["articles"]));
    const initTagData = yield call(fetchInitialData, "/tags");
    yield put(tagsDataLoaded(initTagData["tags"]));
  });

  // 文章评论
  yield takeLatest(INIT_ARTICLE_COMMENT_GET, function*(slug) {
    const initArticleData = yield call(
      fetchInitialData,
      `/articles/${slug.slug}`
    );
    yield put(articleContentLoaded(initArticleData.article));

    const initCommentData = yield call(
      fetchInitialData,
      `/articles/${slug.slug}/comments`
    );
    yield put(articleCommentsLoaded(initCommentData));
  });

  // 热门标签
  yield takeLatest(POPULAR_TAG_CLICKED, function*(tagName) {
    const isDisplay = true
    const tagRelatedData = yield call(
      fetchInitialData,
      `/articles?tag=${tagName.tagName}&limit=10&offset=0`
    );
    yield put(tagRelatedArticleLoaded(tagRelatedData.articles, isDisplay));
  });
};

const fetchInitialData = url => {
  return fetch("https://conduit.productionready.io/api" + url).then(
    response => {
      if (response.ok) {
        return response.json();
      } else console.error("--- get data failed ---");
    }
  );
};
