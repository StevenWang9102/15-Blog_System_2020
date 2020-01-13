import { takeLatest, put, call } from 'redux-saga/effects';
import { INITIALDATA_LOADED, articleDataLoaded } from './feedActions';
import axios from "axios";

export const feedSaga = function* () {
    yield takeLatest(INITIALDATA_LOADED, loadInitialData); 
    //为什么需要最新的？@@@@@@
};

const loadInitialData = function* () {
    // const [users, books] = yield call(fetchData);
    const initData = yield call(fetchData);
    console.log(initData[0].data['articles']);
    yield put(articleDataLoaded(initData[0].data['articles']));
    // 分发给actions
};

const fetchData = () => {
    return Promise.all([axios.get("https://conduit.productionready.io/api/articles?limit=10&offset=0")]); 
    // 要替换axios@@@@@@
};

