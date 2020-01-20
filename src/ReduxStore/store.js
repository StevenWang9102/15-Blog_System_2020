import { feedReducer } from './feedReducers';
import { feedSaga } from './feedSagas';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'; 

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(feedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(feedSaga);
