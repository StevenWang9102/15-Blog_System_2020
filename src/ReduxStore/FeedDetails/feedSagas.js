import { fetchInitCommentData } from './fetchInitCommentData'
import { takeLatest, put, call } from 'redux-saga/effects';
import {
  INITIALDATA_LOADED,
  articleDataLoaded,
  tagsDataLoaded
} from "./feedActions";


export const feedSaga = function*() {
  yield takeLatest(INITIALDATA_LOADED, loadInitialData);
};

const loadInitialData = function*() {
  const initArticData = yield call(fetchInitArticleData);
  console.log(initArticData);

  yield put(articleDataLoaded(initArticData["articles"]));

  const initTagData = yield call(fetchInitTagesData);
  yield put(tagsDataLoaded(initTagData["tags"]));

  const initCommentData = yield call(fetchInitCommentData);
  console.log(initCommentData);

  // yield put(tagsDataLoaded(initTagData.data["tags"]));
};

const fetchInitArticleData = () => {
  return fetch ("https://conduit.productionready.io/api/articles?limit=50&offset=10")
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
  return fetch ("https://conduit.productionready.io/api/tags")
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
