import { all } from "redux-saga/effects";

import {userSaga} from './userSagas'
import {eventSaga} from './eventSagas'
import {articleSaga} from './articleSagas'

export const rootSaga = function*(){
  yield all([userSaga(), articleSaga(), eventSaga()])
};