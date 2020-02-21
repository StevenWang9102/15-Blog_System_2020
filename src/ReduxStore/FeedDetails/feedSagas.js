import { takeLatest, put, call, all, select } from "redux-saga/effects";
import { getUser, setUser } from "../../Components/UserComponent/AuthToken";
import {
  INITIALDATA_LOADED,
  INIT_ARTICLE_DETAILS_GET,
  POPULAR_TAG_CLICKED,
  articleDataLoaded,
  articleContentLoaded,
  articleCommentsLoaded,
  tagRelatedArticleLoaded,
  relatedTagLoaded,
  USERS_NAME_LOADED,
  userProfileDataLoaded,
  tagsDataLoaded,
  userRelatedArticlesLoaded,
  POST_ARTICLE_CLICKED,
  FAVERATED_ARITICLE_CLICKED,
  favoritedArticleLoaded,
  SIGN_IN_BUTTON_CLICKED,
  userTokedLoaded,
  YOURE_FEED_CLICKED,
  yourFeedsLoaded,
  FAVORITED_BUTTON_CLICKED,
  setNavStatus,
  globalDataLoaded,
  POST_COMMENTS_CLICKED,
  USER_TOKEN_LOADED
} from "./feedActions";

export const getUserInformation = function (state) {
  // const reduxStoredUserInfo = yield select(state => state.userInfo);
  // console.log('console.log(reduxStoredUserInfo);');
  // console.log(reduxStoredUserInfo);
  // if(reduxStoredUserInfo) return reduxStoredUserInfo
  // else
  // put到redux store...
  return getUser();
};

export const getUserInformation2 = function* (state) {
  const reduxStoredUserInfo = yield select(state => state.userInfo);
  console.log('console.log(reduxStoredUserInfo);');
  console.log(reduxStoredUserInfo);
  if (!reduxStoredUserInfo.username) {
    const sessionStoredUserInfo = getUser();
    if (sessionStoredUserInfo) {
      yield put(userTokedLoaded(sessionStoredUserInfo));
    }
  }
  // if(reduxStoredUserInfo) return reduxStoredUserInfo
  // else
  // put到redux store...
  return getUser();
};

export const feedSaga = function* () {
  // GLOBAL_FEEDS_LOADED
  yield takeLatest(INITIALDATA_LOADED, function* () {
    // const token = yield select(state => state.userInfo)
    const initArticData = yield call(
      fetchInitialData,
      "/articles?limit=50&offset=10"
    );

    yield put(articleDataLoaded(initArticData["articles"]));
    yield put(globalDataLoaded(initArticData["articles"]));

    const initTagData = yield call(fetchInitialData, "/tags");
    yield put(tagsDataLoaded(initTagData["tags"]));
  });

  // ARTICLE_COMMENT_LOADED 这里面获取失败
  // ARTICLE_COMMENT_LOADED

  // 这篇文章 404报错，
  // 携带token，是谁
  // 是get方法，
  // 哪片文章。。。。。。。。。。。。。。。。。。。。。。。。。。。

  yield takeLatest(INIT_ARTICLE_DETAILS_GET, function* (action) {
    const initArticleData = yield call(
      fetchInitialData,
      `/articles/${action.slug}`
    );
    yield put(articleContentLoaded(initArticleData.article));

    const initCommentData = yield call(
      fetchInitialData,
      `/articles/${action.slug}/comments`
    );
    yield put(articleCommentsLoaded(initCommentData));
  });

  // POPULAR_TAG_CLICKED
  yield takeLatest(POPULAR_TAG_CLICKED, function* (action) {
    const tagRelatedData = yield call(
      fetchInitialData,
      `/articles?tag=${action.tagName}&limit=10&offset=0`
    );
    yield put(tagRelatedArticleLoaded(tagRelatedData.articles));
    yield put(relatedTagLoaded(action.tagName));
  });

  // USER PROFILE LOADED
  yield takeLatest(USERS_NAME_LOADED, function* (action) {
    const [userProfileData, userRelatedArticles] = yield all([
      call(fetchInitialData, `/profiles/${action.userName}`),
      call(
        fetchInitialData,
        `/articles?author=${action.userName}&limit=5&offset=0`
      )
    ]);

    yield put(userProfileDataLoaded(userProfileData));
    yield put(userRelatedArticlesLoaded(userRelatedArticles.articles));
  });

  // FAVERATED_ARITICLE_CLICKED
  yield takeLatest(FAVERATED_ARITICLE_CLICKED, function* (action) {
    const favoritedArticlesData = yield call(
      fetchInitialData,
      `/articles?favorited=${action.userName}&limit=5&offset=0`
    );

    yield put(favoritedArticleLoaded(favoritedArticlesData.articles));
  });

  // SIGN_IN_BUTTON_CLICKED
  yield takeLatest(SIGN_IN_BUTTON_CLICKED, function* (action) {
    const userData = {};
    const url = "/users/login";

    userData.email = action.email;
    userData.password = action.password;

    const postData = { user: userData };
    const userPostedData = yield call(postDataToServerAll, null, url, postData);

    setUser(userPostedData.user);
    yield put(userTokedLoaded(userPostedData.user));
    yield put(setNavStatus("active", "null", "null"));
  });

  // YOURE_FEED_CLICKED
  yield takeLatest(YOURE_FEED_CLICKED, function* () {
    yield getUserInformation2();
    const token = getUserInformation().token;
    const yourArticleData = yield call(getDataFromServerWithToken, token);

    yield put(yourFeedsLoaded(yourArticleData.articles));
  });

  // FAVORITED_BUTTON_CLICKED
  yield takeLatest(FAVORITED_BUTTON_CLICKED, function* (action) {
    const slug = action.slug;
    const token = action.token;
    const url = `/articles/${slug}/favorite`;
    const yourFavoritedData = yield call(postDataToServerAll, token, url);
  });

  // POST_COMMENTS_CLICKED
  yield takeLatest(POST_COMMENTS_CLICKED, function* (action) {
    const token = getUserInformation().token;
    const url = `/articles/${action.slug}/comments`;
    const postData = {};
    postData.comment = { body: `${action.myComment}` };
    // const yourPostData =
    yield call(postDataToServerAll, token, url, postData);
    const initCommentData = yield call(
      fetchInitialData,
      `/articles/${action.slug}/comments`
    );
    yield put(articleCommentsLoaded(initCommentData));
  });

  // POST_ARTICLE_CLICKED
  yield takeLatest(POST_ARTICLE_CLICKED, function* (action) {
    console.log('进来了吗');

    const token = getUserInformation().token;
    const url = "/articles";
    const postData = {};

    postData.article = {
      title: `${action.title}`,
      description: `${action.description}`,
      body: `${action.content}`,
      tagList: `${action.tags}`
    };
    // const postArticleData =
    yield call(postDataToServerAll, token, url, postData);
  });
};

const postDataToServerAll = (token, url, postData) => {
  const headers = { "Content-Type": "application/json", };
  if (token !== null) {
    headers["Authorization"] = `Token ${token}`;
  }

  return fetch(`https://conduit.productionready.io/api${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(postData)
  }).then(response => {
    if (response.ok) {
      return response.json().then(response => {
        console.log(" -- SUCCESS —- ", response);
        return response;
      });
    } else console.error(" -- Error: Post data failed -- ");
  });
};

const getDataFromServerWithToken = token => {
  return fetch(
    "https://conduit.productionready.io/api/articles/feed?limit=10&offset=0",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    }
  ).then(response => {
    if (response.ok) {
      return response.json().then(response => {
        console.log(" -- Get Your Feeds Success -- :", response);
        return response;
      });
    } else console.error(" -- Error: get data failed -- ");
  });
};

const fetchInitialData = url => {
  return fetch("https://conduit.productionready.io/api" + url).then(
    response => {
      if (response.ok) {
        console.log(" -- Get Data Success -- ");
        return response.json();
      } else console.error(" -- Error: get data failed -- ");
    }
  );
};
