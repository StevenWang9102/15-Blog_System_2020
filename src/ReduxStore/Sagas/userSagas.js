import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  setUserOnSession
} from "../../Components/UserComponent/AuthToken";
import { getUserInfoSagaLocal } from "../getUserInfo";
import {
  fetchDataFromServer,
  postDataToServerAll,
} from "../httpMethods";

import {
  LOADED_USER_PROFILE,
  userProfileDataLoaded,
  userRelatedArticlesLoaded,
  SIGN_UP_BUTTON_CLICK,
  SIGN_IN_BUTTON_CLICKED,
  userInformationLoaded,
  signUpUserLoaded
} from "../Actions/userActions";

import { currentDisplayArticleLoaded } from "../Actions/articleActions";

import { setLoading, setHomeNavStatus } from "../Actions/eventActions";

export const userSaga = function*() {

  // LOADED_USER_PROFILE
  yield takeLatest(LOADED_USER_PROFILE, function*(action) {
    const token = getUserInfoSagaLocal().token;
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
        `/articles?author=${userName}&limit=${action.articleCountDisplay}&offset=${action.articleOffSet}`,
        "Load User Articles"
      )
    ]);

    // need clean ...
    yield put(userProfileDataLoaded(userProfileData.profile));
    yield put(userRelatedArticlesLoaded(userRelatedArticles));
    yield put(currentDisplayArticleLoaded(userRelatedArticles.articles));
    yield put(setLoading("LOADED"));
  });

  // SIGN_IN_BUTTON_CLICKED
  yield takeLatest(SIGN_IN_BUTTON_CLICKED, function*(action) {
    const userData = {};
    const url = "/users/login";
    const message = "Sign in";

    userData.email = action.email;
    userData.password = action.password;

    const postData = { user: userData };
    const userPostedData = yield call(
      postDataToServerAll,
      null,
      url,
      postData,
      message,
      "POST"
    );

    if (!userPostedData) alert("Login fail！Check username and password");
    if (userPostedData) setUserOnSession(userPostedData.user);

    yield put(userInformationLoaded(userPostedData));
    yield put(setHomeNavStatus("active", "null", "null"));
    yield put(setLoading("LOADED"));
  });

  // SIGN_UP_BUTTON_CLICK
  yield takeLatest(SIGN_UP_BUTTON_CLICK, function*(action) {
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
    setUserOnSession(signUpUser.user);
    yield put(userInformationLoaded(signUpUser));
    yield put(signUpUserLoaded(signUpUser));
  });
};
