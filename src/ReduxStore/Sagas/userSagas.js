import { takeLatest, put, call, all, select } from "redux-saga/effects";
import { setUserOnSession } from "../../ReduxStore/AuthToken";
import { getUserInfoSagaLocal } from "../../ReduxStore/getUserInfoSagaLocal";
import { fetchDataFromServer, postDataToServerAll } from "../HttpClient";

import {
  LOADED_USER_PROFILE,
  userProfileDataLoaded,
  SIGN_UP_BUTTON_CLICK,
  SIGN_IN_BUTTON_CLICKED,
  userInformationLoaded,
  setSignUpStatus
} from "../Actions/userActions";

import { currentDisplayArticleLoaded } from "../Actions/articleActions";

import { setLoading, setHomeNavStatus } from "../Actions/eventActions";

export const userSaga = function*() {
  // LOADED_USER_PROFILE
  yield takeLatest(LOADED_USER_PROFILE, function*(action) {
    try {
      yield put(setLoading("LOADING"));
      const state = yield select();
      let token = null;
      if (getUserInfoSagaLocal(state)) {
        token = getUserInfoSagaLocal(state).token;
      }

      const userName = action.author_name;
      const [userProfileData, userRelatedArticles] = yield all([
        call(
          postDataToServerAll,
          token,
          `/profiles/${userName}`,
          "NothingToPost",
          "Load User Profile",
          "GET"
        ),
        call(
          fetchDataFromServer,
          `/articles?author=${userName}&limit=${action.displayLimit}&offset=${action.offset}`,
          "Load User Articles"
        )
      ]);

      yield put(userProfileDataLoaded(userProfileData.profile));
      yield put(currentDisplayArticleLoaded(userRelatedArticles));
      yield put(setLoading("LOADED"));
    } catch {
      yield put(setLoading("LOADED"));
    }
  });

  // SIGN_IN_BUTTON_CLICKED
  yield takeLatest(SIGN_IN_BUTTON_CLICKED, function*(action) {
    try {
      
      yield put(setLoading("LOADING"));
      const userData = {};
      const url = "/users/login";
      const message = "Sign in";

      // userData.email = action.email;
      // userData.password = action.password;

      userData.email = "steven.wang.akl@gmail.com";
      userData.password = "co7218891";

      const postData = { user: userData };
      const userPostedData = yield call(
        postDataToServerAll,
        null,
        url,
        postData,
        message,
        "POST"
      );

      if (!userPostedData) alert("Log in fail. Check username and password");
      if (userPostedData) setUserOnSession(userPostedData.user);

      yield put(userInformationLoaded(userPostedData));
      yield put(setHomeNavStatus("active", "null", "null"));
      yield put(setLoading("LOADED"));
    } catch {
      yield put(setLoading("LOADED"));
    }
  });

  // SIGN_UP_BUTTON_CLICK
  yield takeLatest(SIGN_UP_BUTTON_CLICK, function*(action) {
    try {
      yield put(setLoading("LOADING"));
      const token = null;
      const url = "/users";
      const postData = {};
      const message = "Sign Up";
      postData.user = {
        username: `${action.userName}`,
        email: `${action.email}`,
        password: `${action.password}`
      };
      const signUpUser = yield call(
        postDataToServerAll,
        token,
        url,
        postData,
        message,
        "POST"
      );
      if (!signUpUser)
        alert("Sign Up fail. Change username, email and password");
      if (signUpUser) setUserOnSession(signUpUser.user);

      yield put(userInformationLoaded(signUpUser));
      yield put(setSignUpStatus("LOADED"));
      yield put(setLoading("LOADED"));
    } catch {
      yield put(setLoading("LOADED"));
    }
  });
};
