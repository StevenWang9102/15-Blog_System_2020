import { syncReducer } from "./FeedDetails/syncReducers";
import { asyncReducer } from "./FeedDetails/asyncReducers";

import { getSaga } from "./FeedDetails/getSagas";
import { postSaga } from "./FeedDetails/postSagas";
import { putSaga } from "./FeedDetails/putSagas";

import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(combineReducers({syncReducer, asyncReducer}), composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(postSaga, getSaga, putSaga);
