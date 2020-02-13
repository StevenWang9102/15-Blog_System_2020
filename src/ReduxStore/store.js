import { feedReducer } from "./FeedDetails/feedReducers";
import { feedSaga } from "./FeedDetails/feedSagas";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(feedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(feedSaga);
