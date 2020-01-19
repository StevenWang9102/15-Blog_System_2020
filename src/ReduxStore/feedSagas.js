import { takeLatest, put, call } from 'redux-saga/effects';
import { INITIALDATA_LOADED, articleDataLoaded } from './feedActions';

export const feedSaga = function*() {
  yield takeLatest(INITIALDATA_LOADED, loadInitialData);
};

const loadInitialData = function*() {
  const initData = yield call(fetchData);
  console.log(initData.data["articles"])
  yield put(articleDataLoaded(initData.data["articles"]));
};

const fetchData = () => {
    // return axios.get("https://conduit.productionready.io/api/articles?limit=50&offset=10");
    fetch("https://conduit.productionready.io/api/articles?limit=50&offset=10").then((response)=>{
      return response
    })
    // 
};
