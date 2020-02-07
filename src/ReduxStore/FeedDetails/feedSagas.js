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
  YOURE_ARTICLES_NEEDED
} from "./feedActions";
import {userToken} from "../selector"

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
    const userProfileData = yield call(
      fetchInitialData,
      `/profiles/${action.userName}`
    );
    const userRelatedArticles = yield call(
      fetchInitialData,
      `/articles?author=${action.userName}&limit=5&offset=0`
    );

    yield put(userProfileDataLoaded(userProfileData));
    yield put(userRelatedArticlesLoaded(userRelatedArticles.articles));
  });

  // Favarited Articles
  yield takeLatest(FAVERATED_ARITICLE_CLICKED, function*(action) {
    const favoritedArticlesData = yield call(
      fetchInitialData,
      `/articles?favorited=${action.userName}&limit=5&offset=0`
    );
    console.log(favoritedArticlesData);
    yield put(favoritedArticleLoaded(favoritedArticlesData.articles));
  });

  // SignIn Function
  yield takeLatest(SIGN_IN_BUTTON_CLICKED, function*(action) {
    const userData = {}
    userData.email = action.email;
    userData.password = action.password;
    
    const userPostData = yield call(
      postInitialData,
      userData
    );
    console.log(userPostData.user.token);

    yield put(userTokedLoaded(userPostData.user.token));
    
    // 拿到密钥之后，解锁一些功能:
    // 在哪个页面：导航、副导航
    // 重新进行get文章 https://conduit.productionready.io/api/articles/feed?limit=10&offset=0
    // 现在是重新get // 等于是加载密钥作者的文章
    // 之前get文章："https://conduit.productionready.io/api/articles?limit=50&offset=10
    // 重新get标签 https://conduit.productionready.io/api/tags
    // 等于是加载密钥作者的热门文章
  });

  // Your Articles Needed
  yield takeLatest(YOURE_ARTICLES_NEEDED, function*(action) {
    const token = yield select(userToken)
    
    // const yourArticleData = yield call(
    //   fetchYourArticles,
    //   token
    // );
  
    // console.log(yourArticleData);
    // yield put(userTokedLoaded(userPostData.user.token));
  });
};

// Progress Now //////////////////////////////////////////////
// Progress Now //////////////////////////////////////////////


// const fetchYourArticles = token => {
//   return fetch("https://conduit.productionready.io/api/articles/feed?limit=10&offset=0", {
//     method: "GET", 
//     headers: {
//       "Content-Type": "application/json"
//     },
//     Authorization: `Token ${token}`
//   }).then(response => response.json())
//     .then(response => {
//       console.log(" -- get Your Article Success:", response);
//       return response
//     })
// };

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
  }).then(response => response.json())
    .then(response => {
      console.log("-- Post User Information Success::", response);
      return response
    })
};
