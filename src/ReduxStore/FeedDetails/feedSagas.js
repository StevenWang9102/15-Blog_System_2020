import { takeLatest, put, call } from 'redux-saga/effects';
import { INITIALDATA_LOADED, articleDataLoaded } from './feedActions';
import axios from 'axios';

export const feedSaga = function*() {
  yield takeLatest(INITIALDATA_LOADED, loadInitialData);
};

const loadInitialData = function*() {
  const initData = yield call(fetchData);
  yield put(articleDataLoaded(initData.data["articles"]));
};

const fetchData = () => {
    return axios.get("https://conduit.productionready.io/api/articles?limit=10&offset=0");
    // 要替换axios@@@@@@
    
    // fetch("https://conduit.productionready.io/api/articles?limit=50&offset=10").then((response)=>{
    //   return response
    // })
};
