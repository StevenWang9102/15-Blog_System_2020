import { syncReducer } from "./FeedDetails/syncReducers";
import { asyncReducer } from "./FeedDetails/asyncReducers";

import { feedSaga } from "./FeedDetails/feedSagas";
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(combineReducers({syncReducer, asyncReducer}), composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(feedSaga);
