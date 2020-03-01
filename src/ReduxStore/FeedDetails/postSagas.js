import { takeLatest, put, call} from "redux-saga/effects";
import {
  // getUserFromSession,
  setUserOnSession
} from "../../Components/UserComponent/AuthToken";
import { getUserInfoSagaLocal } from "../getUserInfo"
import { postDataToServerAll} from "../httpRequest"
import {
  signUpUserLoaded,
  favoritedArticleNavClicked,
  SIGN_UP_BUTTON_CLICK,
  loadGlobalFeeds,
  articleContentLoaded,
  articleCommentsLoaded,
  POST_ARTICLE_CLICKED,
  SIGN_IN_BUTTON_CLICKED,
  userInformationLoaded,
  LOAD_YOUR_FEED,
  yourFeedsLoaded,
  FAVORITED_BUTTON_CLICKED,
  setHomeNavStatus,
  postedArticleReloaded,
  currentHomeDisplayArticleLoaded
} from "./feedActions";


export const postSaga = function*(){

  // FAVORITED_BUTTON_CLICKED
  yield takeLatest(FAVORITED_BUTTON_CLICKED, function*(action) {
    const slug = action.slug;
    const token = action.token;
    const url = `/articles/${slug}/favorite`;
    const message = "Post Favoriated Articles";
    const type = action.httpMethod;
    yield call(
      postDataToServerAll,
      token,
      url,
      "NothingToPost",
      message,
      type
    );

    yield put(loadGlobalFeeds());
    yield put(favoritedArticleNavClicked(action.author_name));
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
    
    setUserOnSession(userPostedData.user);
    yield put(userInformationLoaded(userPostedData));
    yield put(setHomeNavStatus("active", "null", "null"));
  });

  // LOAD_YOUR_FEED
  yield takeLatest(LOAD_YOUR_FEED, function*() {
    const token = getUserInfoSagaLocal().token;
    const url = "/articles/feed?limit=10&offset=0";
    const message = "Load Your Feed";
    const yourArticleData = yield call(
      postDataToServerAll,
      token,
      url,
      "NothingToPost",
      message,
      "GET"
    );
    yield put(yourFeedsLoaded(yourArticleData.articles));
    yield put(currentHomeDisplayArticleLoaded(yourArticleData.articles));
  });

  // POST_ARTICLE_CLICKED
  yield takeLatest(POST_ARTICLE_CLICKED, function*(action) {
    const token = getUserInfoSagaLocal().token;
    let url,
      type = "";
    const postData = {};
    const message = "Post an Article";

    if (action.slug) {
      type = "PUT";
      url = `/articles/${action.slug}`;
    } else {
      type = "POST";
      url = "/articles";
    }

    postData.article = {
      title: `${action.title}`,
      description: `${action.description}`,
      body: `${action.content}`,
      tagList: `${action.tags}`
    };

    const yourArticle = yield call(
      postDataToServerAll,
      token,
      url,
      postData,
      message,
      type
    );

    yield put(articleContentLoaded(yourArticle.article));
    yield put(articleCommentsLoaded(yourArticle));
    yield put(postedArticleReloaded(true));
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


