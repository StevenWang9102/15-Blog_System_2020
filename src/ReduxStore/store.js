import { articleReducer } from "./Reducers/articleReducers";
import { eventReducer } from "./Reducers/eventReducers";
import { userReducer } from "./Reducers/userReducers";
import { rootSaga } from "./Sagas/rootSagas";

import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(combineReducers({articleReducer, eventReducer, userReducer}), composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
