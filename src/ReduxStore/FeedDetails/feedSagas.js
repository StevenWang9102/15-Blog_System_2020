import { takeLatest, put, call } from "redux-saga/effects";
import { INITIALDATA_LOADED, articleDataLoaded } from "./feedActions";
import axios from "axios";

export const feedSaga = function*() {
  yield takeLatest(INITIALDATA_LOADED, loadInitialData);
};

const loadInitialData = function*() {
  const initData = yield call(fetchData);
  console.log(initData.data["articles"])
  yield put(articleDataLoaded(initData.data["articles"]));
};

const fetchData = () => {
    return axios.get("https://conduit.productionready.io/api/articles?limit=50&offset=10");
    // 要替换axios@@@@@@
    
    //   const Http = new XMLHttpRequest();
    //   const URL =
    //     "https://conduit.productionready.io/api/articles?limit=10&offset=0";
    //   Http.open("GET", URL);
    //   Http.send();
    
    //   Http.onreadystatechange = function() {
    //     if (this.readyState === 4 && this.status === 200) {
    //     //   console.log(JSON.parse(this.responseText));
    //       return JSON.parse(this.responseText);
    //     }
    //   };
};
