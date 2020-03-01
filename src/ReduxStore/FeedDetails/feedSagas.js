import { takeLatest, put, call, all, select } from "redux-saga/effects";
import {
  getUserFromSession,
  setUserOnSession
} from "../../Components/UserComponent/AuthToken";
import {
  LOAD_GLOBAL_FEEDS,
  LOAD_INIT_ARTICLE_DETAIL,
  signUpUserLoaded,
  POPULAR_TAG_CLICKED,
  LOAD_ARTICLE_SETTING_DETAIL,
  articleDataLoaded,
  favoritedArticleNavClicked,
  deleteYourArticle,
  SIGN_UP_BUTTON_CLICK,
  loadGlobalFeeds,
  articleContentLoaded,
  articleCommentsLoaded,
  tagRelatedArticleLoaded,
  relatedTagLoaded,
  UPDATE_SETTING_BUTTON_CLICK,
  LOADED_USER_PROFILE,
  userProfileDataLoaded,
  tagsDataLoaded,
  userRelatedArticlesLoaded,
  updatedYourSetting,
  POST_ARTICLE_CLICKED,
  FAVERATED_NAV_CLICKED,
  LOAD_POPULAR_TAGS,
  articleSettingContentLoaded,
  favoritedArticleLoaded,
  DELETE_ARTICLE_BUTTON,
  SIGN_IN_BUTTON_CLICKED,
  userInformationLoaded,
  YOURE_FEED_CLICKED,
  yourFeedsLoaded,
  FAVORITED_BUTTON_CLICKED,
  setHomeNavStatus,
  POST_COMMENTS_CLICKED,
  postedArticleReloaded,
  currentDisplayArticleLoaded,
  currentHomeDisplayArticleLoaded
} from "./feedActions";



export const feedSaga = function*() {

  const getUserInfoSagaLocal =()=>{
    return getUserFromSession();
  }
  // const userInfoLocal = getUserFromSession();
  // 一定在方程内部
// 这句此处还需要思考
// 或是从 redux store 上面拿到

// const getUserInfoSagaLocal= function() {
//   return select(state => state.userInformation)
// }

  // GLOBAL_FEEDS_LOADED
  yield takeLatest(LOAD_GLOBAL_FEEDS, function*() {
    const initArticData = yield call(
      fetchDataFromServer,
      "/articles?limit=50&offset=10",
      "Load Global Feeds"
    );
    yield put(articleDataLoaded(initArticData["articles"]));
  });

  // LOAD_POPULAR_TAGS
  yield takeLatest(LOAD_POPULAR_TAGS, function*() {
    const initTagData = yield call(
      fetchDataFromServer,
      "/tags",
      "Load Initial Popular Tags"
    );
    yield put(tagsDataLoaded(initTagData["tags"]));
  });

  // ARTICLE_DETAILS_LOADED
  yield takeLatest(LOAD_INIT_ARTICLE_DETAIL, function*(action) {
    const initArticleData = yield call(
      fetchDataFromServer,
      `/articles/${action.slug}`,
      "Load Article"
    );
    yield put(articleContentLoaded(initArticleData.article));
  });

  // LOAD_ARTICLE_SETTING_DETAIL
  yield takeLatest(LOAD_ARTICLE_SETTING_DETAIL, function*(action) {
    const initArticleData = yield call(
      fetchDataFromServer,
      `/articles/${action.slug}`,
      "Load Article Setting"
    );
    yield put(articleSettingContentLoaded(initArticleData.article));
  });

  // ARTICLE_COMMENT_LOADED
  yield takeLatest(LOAD_INIT_ARTICLE_DETAIL, function*(action) {
    const initCommentData = yield call(
      fetchDataFromServer,
      `/articles/${action.slug}/comments`,
      "Load Article Comments"
    );

    yield put(articleCommentsLoaded(initCommentData));
  });

  // POST_COMMENTS_CLICKED
  yield takeLatest(POST_COMMENTS_CLICKED, function*(action) {
    // console.log(getUserInfoSagaLocal());

    const token = getUserInfoSagaLocal.token;

    const url = `/articles/${action.slug}/comments`;
    const message = "Post My Comments";
    const postData = {};
    postData.comment = { body: `${action.myComment}` };
    yield call(postDataToServerAll, token, url, postData, message, "POST");

    const initCommentData = yield call(
      fetchDataFromServer,
      `/articles/${action.slug}/comments`
    );
    yield put(articleCommentsLoaded(initCommentData));
  });

  // POPULAR_TAG_CLICKED
  yield takeLatest(POPULAR_TAG_CLICKED, function*(action) {
    const tagRelatedData = yield call(
      fetchDataFromServer,
      `/articles?tag=${action.tagName}&limit=10&offset=0`,
      "Load Popular Tags"
    );
    yield put(tagRelatedArticleLoaded(tagRelatedData.articles));
    yield put(relatedTagLoaded(action.tagName));
  });

  // LOADED_USER_PROFILE
  yield takeLatest(LOADED_USER_PROFILE, function*(action) {
    const userName = action.author_name;

    const [userProfileData, userRelatedArticles] = yield all([
      call(fetchDataFromServer, `/profiles/${userName}`, "Load User Profile"),
      call(
        fetchDataFromServer,
        `/articles?author=${userName}&limit=5&offset=0`,
        "Load User Articles"
      )
    ]);

    yield put(userProfileDataLoaded(userProfileData));
    yield put(userRelatedArticlesLoaded(userRelatedArticles.articles));
    yield put(currentDisplayArticleLoaded(userRelatedArticles.articles));
  });

  // FAVERATED_NAV_CLICKED
  yield takeLatest(FAVERATED_NAV_CLICKED, function*(action) {
    const userName = action.author_name;

    const favoritedArticlesData = yield call(
      fetchDataFromServer,
      `/articles?favorited=${userName}&limit=30&offset=0`,
      "Load Your Favorited Articles"
    );

    yield put(favoritedArticleLoaded(favoritedArticlesData.articles));
    yield put(currentDisplayArticleLoaded(favoritedArticlesData.articles));
  });

  // FAVORITED_BUTTON_CLICKED
  yield takeLatest(FAVORITED_BUTTON_CLICKED, function*(action) {
    const slug = action.slug;
    const token = action.token;
    const url = `/articles/${slug}/favorite`;
    const message = "Post Favoriated Articles";
    const type = action.httpMethod;
    const favoriedArticles = yield call(
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

    console.log(userPostedData);
    
    setUserOnSession(userPostedData.user);
    yield put(userInformationLoaded(userPostedData));
    // 此处要设置userInformation 
    yield put(setHomeNavStatus(["active", "null", "null"]));
  });

  // YOURE_FEED_CLICKED
  yield takeLatest(YOURE_FEED_CLICKED, function*() {
    const token = getUserInfoSagaLocal.token;
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
    const token = getUserInfoSagaLocal.token;
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

  // UPDATE_SETTING_BUTTON_CLICK
  yield takeLatest(UPDATE_SETTING_BUTTON_CLICK, function*(action) {
    const token = getUserInfoSagaLocal.token;
    const url = "/user";
    const message = "Update User Setting";
    const postData = action.request;
    const userSetting = yield call(
      postDataToServerAll,
      token,
      url,
      postData,
      message,
      "PUT"
    );
    setUserOnSession(userSetting.user);
    yield put(updatedYourSetting("updated"));
  });

  // DELETE_ARTICLE_BUTTON
  yield takeLatest(DELETE_ARTICLE_BUTTON, function*(action) {
    const token = getUserInfoSagaLocal.token;
    const url = `/articles/${action.slug}`;
    const message = "Delete Article";
    const postData = "NothingToPost";
    const deleteArticle = yield call(
      postDataToServerAll,
      token,
      url,
      postData,
      message,
      "DELETE"
    );
    yield put(deleteYourArticle(deleteArticle));
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

const postDataToServerAll = (token, url, postData, message, type) => {
  let headers = { "Content-Type": "application/json" };
  let request = {
    method: `${type}`,
    headers
  };

  if (postData !== "NothingToPost") request["body"] = JSON.stringify(postData);
  if (token !== null) headers["Authorization"] = `Token ${token}`;

  return fetch(`https://conduit.productionready.io/api${url}`, request).then(
    response => {
      if (response.ok) {
        return response.json().then(response => {
          console.log(` -- ${message} Success —- `);
          return response;
        });
      } else console.error(` -- Error: ${message} failed -- `);
    }
  );
};

const fetchDataFromServer = (url, message) => {
  return fetch("https://conduit.productionready.io/api" + url).then(
    response => {
      if (response.ok) {
        console.log(` -- ${message} Success -- `);
        return response.json();
      } else console.error(" -- Error: get data failed -- ");
    }
  );
};
