import { takeLatest, put, call } from 'redux-saga/effects';
import { INITIALDATA_LOADED, articleDataLoaded, tagsDataLoaded } from './feedActions';
import axios from 'axios';

export const feedSaga = function*() {
  yield takeLatest(INITIALDATA_LOADED, loadInitialData);
};

const loadInitialData = function*() {
  const initArticData = yield call(fetchInitArticleData);
  yield put(articleDataLoaded(initArticData.data["articles"]));

  const initTagData = yield call(fetchInitTagesData);
  yield put(tagsDataLoaded(initTagData.data["tags"]));    

  const initCommentData = yield call(fetchInitCommentData);
  console.log(initCommentData);
  
  yield put(tagsDataLoaded(initTagData.data["tags"]));
};

const fetchInitArticleData = () => {
  return axios.get("https://conduit.productionready.io/api/articles?limit=10&offset=0");
  // return fetch(
  //   "https://conduit.productionready.io/api/articles?limit=50&offset=10"
  // ).then(response => {
  //   response.json().then(data => {
  //     console.log(data);
  //     return data;
  //   });
  // });
};

const fetchInitTagesData = () => {
  return axios.get("https://conduit.productionready.io/api/tags");
};

const fetchInitCommentData = () => {
  return axios.get("https://conduit.productionready.io/api/articles/:slug/comments");
};
