import { takeLatest, put, call } from "redux-saga/effects";
import {
  INITIALDATA_LOADED,
  INIT_ARTICLE_COMMENT_GET,
  articleDataLoaded,
  articleCommentsLoaded,
  tagsDataLoaded
} from "./feedActions";

export const feedSaga = function*() {
  yield takeLatest(INITIALDATA_LOADED, function*() {
    // load all articles
    const initArticData = yield call(fetchInitArticleData);
    yield put(articleDataLoaded(initArticData["articles"]));
    // load popular tages
    const initTagData = yield call(fetchInitTagesData);
    yield put(tagsDataLoaded(initTagData["tags"]));
  });
  yield takeLatest(INIT_ARTICLE_COMMENT_GET, function*(slug) {    
    const initCommentData = yield call(fetchInitCommentData, slug.slug);
    console.log(initCommentData);
    yield put(articleCommentsLoaded(initCommentData));
    // 这句啥意思
  });
};

const fetchInitCommentData = slug => {  
  return fetch(
    `https://conduit.productionready.io/api/articles/${slug}/comments`
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("get article comments failed");
      }
    })
};

const fetchInitArticleData = () => {
  return fetch(
    "https://conduit.productionready.io/api/articles?limit=50&offset=10"
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("get data failed");
      }
    })
    .catch(error => {
      console.log(error);
    });
};

const fetchInitTagesData = () => {
  return fetch("https://conduit.productionready.io/api/tags")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("get popular tags failed");
      }
    })
    .catch(error => {
      console.log(error);
    });
};
