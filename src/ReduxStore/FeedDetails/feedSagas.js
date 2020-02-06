import { takeLatest, put, call } from "redux-saga/effects";
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
  SIGN_IN_BUTTON_CLICKED
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

  // 文章评论
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

  // 热门标签：要文章，要标签名称
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

  // SignIn Function。。。。。。。。。。。。。。
  yield takeLatest(SIGN_IN_BUTTON_CLICKED, function*(action) {
    const favoritedArticlesData = yield call(
      postInitialData,
      `/articles?favorited=${action.userName}&limit=5&offset=0`
    );
    console.log(favoritedArticlesData);
    yield put(favoritedArticleLoaded(favoritedArticlesData.articles));
  });
};

const fetchInitialData = url => {
  return fetch("https://conduit.productionready.io/api" + url).then(
    response => {
      if (response.ok) {
        return response.json();
      } else console.error(" -- Your Error: get data failed -- ");
    }
  );
};

const postInitialData = url => {
  return fetch("https://conduit.productionready.io/api/users/login" + url).then(
    response => {
      if (response.ok) {
        return response.json();
      } else console.error(" -- Your Error: post data failed -- ");
    }
  );
};