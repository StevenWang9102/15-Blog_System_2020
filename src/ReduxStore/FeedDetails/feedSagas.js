import { takeLatest, put, call, select } from "redux-saga/effects";
import {
  INITIALDATA_LOADED,
  INIT_ARTICLE_COMMENT_GET,
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
  FAVERATED_ARITICLE_CLICKED,
  favoritedArticleLoaded,
  SIGN_IN_BUTTON_CLICKED,
  userTokedLoaded,
  // userTokenNameLoaded,
  YOURE_ARTICLES_NEEDED
} from "./feedActions";

export const feedSaga = function*() {
  // Globe feeds
  yield takeLatest(INITIALDATA_LOADED, function*() {
    const initArticData = yield call(
      fetchInitialData,
      "/articles?limit=50&offset=10"
    );
    yield put(articleDataLoaded(initArticData["articles"]));
    const initTagData = yield call(fetchInitialData, "/tags");
    yield put(tagsDataLoaded(initTagData["tags"]));
  });

  // Article Comments
  yield takeLatest(INIT_ARTICLE_COMMENT_GET, function*(action) {
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

  // Popular tags
  yield takeLatest(POPULAR_TAG_CLICKED, function*(action) {
    const tagRelatedData = yield call(
      fetchInitialData,
      `/articles?tag=${action.tagName}&limit=10&offset=0`
    );
    yield put(tagRelatedArticleLoaded(tagRelatedData.articles));
    yield put(relatedTagLoaded(action.tagName));
  });

  // User Profile
  yield takeLatest(USERS_NAME_LOADED, function*(action) {
    const [userProfileData, userRelatedArticles] = yield [
      call(fetchInitialData, `/profiles/${action.userName}`),
      call(
        fetchInitialData,
        `/articles?author=${action.userName}&limit=5&offset=0`
      )
    ];

    yield put(userProfileDataLoaded(userProfileData));
    yield put(userRelatedArticlesLoaded(userRelatedArticles.articles));
  });

  // Favarited Articles
  yield takeLatest(FAVERATED_ARITICLE_CLICKED, function*(action) {
    const favoritedArticlesData = yield call(
      fetchInitialData,
      `/articles?favorited=${action.userName}&limit=5&offset=0`
    );
    yield put(favoritedArticleLoaded(favoritedArticlesData.articles));
  });

  // SignIn Function
  yield takeLatest(SIGN_IN_BUTTON_CLICKED, function*(action) {
    const userData = {};
    userData.email = action.email;
    userData.password = action.password;
    const userPostData = yield call(postInitialData, userData);
    // yield put(userTokedLoaded(userPostData.user.token));
    yield put(userTokedLoaded(userPostData));
  });

  // Your Articles Needed
  // Your Articles Needed
  // Your Articles Needed

  yield takeLatest(YOURE_ARTICLES_NEEDED, function*(action) {
    const state = yield select();
    const token = JSON.stringify(state.userToken)
    console.log(token);
    // 成功拿到密钥
    // 现在报错
    
    const yourArticleData = yield call(fetchYourArticles, token);
    console.log(yourArticleData);
    // yield put(userTokedLoaded(userPostData.user.token));
  }); 
};

// Progress Now //////////////////////////////////////////////
const fetchYourArticles = token => {
  let url = "https://conduit.productionready.io/api/articles/feed?limit=10&offset=0";
  let header = new Headers()
  header.append("Authorization", `Bearer ${token}`)
  let request = new Request(url,{
    method: "GET",
    mode: "cors",
    headers: header
  })

  return fetch(request).then(response => response.json())
    .then(response => {
      console.log(" -- get Your Article Success:", response);
      return response
    })
};

const fetchInitialData = url => {
  return fetch("https://conduit.productionready.io/api" + url).then(
    response => {
      if (response.ok) {
        return response.json();
      } else console.error(" -- Error: get data failed -- ");
    }
  );
};

const postInitialData = userData => {
  const data = { user: userData };
  return fetch("https://conduit.productionready.io/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(response => {
      console.log("-- Post User Information Success::", response);
      return response;
    });
};
