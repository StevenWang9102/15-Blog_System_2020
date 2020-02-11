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
  SIGN_IN_BUTTON_CLICKED,
  userTokedLoaded,
  YOURE_FEED_CLICKED,
  yourFeedsLoaded,
  FAVORITED_BUTTON_CLICKED,
} from "./feedActions";

export const feedSaga = function*() {

  // GLOBAL FEEDS
  yield takeLatest(INITIALDATA_LOADED, function*() {
    const initArticData = yield call(
      fetchInitialData,
      "/articles?limit=50&offset=10"
    );
    yield put(articleDataLoaded(initArticData["articles"]));
    const initTagData = yield call(fetchInitialData, "/tags");
    yield put(tagsDataLoaded(initTagData["tags"]));
  });

  // ARTICLE_COMMENT
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

  // POPULAR_TAG_CLICKED
  yield takeLatest(POPULAR_TAG_CLICKED, function*(action) {
    const tagRelatedData = yield call(
      fetchInitialData,
      `/articles?tag=${action.tagName}&limit=10&offset=0`
    );
    yield put(tagRelatedArticleLoaded(tagRelatedData.articles));
    yield put(relatedTagLoaded(action.tagName));
  });

  // USER PROFILE LOADED
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

  // FAVERATED_ARITICLE_CLICKED
  yield takeLatest(FAVERATED_ARITICLE_CLICKED, function*(action) {
    const favoritedArticlesData = yield call(
      fetchInitialData,
      `/articles?favorited=${action.userName}&limit=5&offset=0`
    );
    yield put(favoritedArticleLoaded(favoritedArticlesData.articles));
  });

  // SIGN_IN_BUTTON_CLICKED
  yield takeLatest(SIGN_IN_BUTTON_CLICKED, function*(action) {
    const userData = {};
    userData.email = action.email;
    userData.password = action.password;
    const userPostData = yield call(postDataToServer1, userData);

    // tag Session Storage
    sessionStorage.setItem("Token", userPostData.user.token);
    sessionStorage.setItem("TokenUserName", userPostData.user.username);

    yield put(userTokedLoaded(userPostData));
  });

  // YOURE_FEED_CLICKED
  yield takeLatest(YOURE_FEED_CLICKED, function*(action) {
    const token = sessionStorage.getItem("Token");
    const yourArticleData = yield call(getDataFromServerWithToken, token);
    yield put(yourFeedsLoaded(yourArticleData.articles));
  });

  // FAVORITED_BUTTON_CLICKED
  yield takeLatest(FAVORITED_BUTTON_CLICKED, function*(action) {
    const slug = action.slug
    const token = action.token
    console.log(token);
    
    // // https://conduit.productionready.io/api/articles/teste-28wve1/favorite
    // 参数是什么？是点击了哪个文章含slug
    const yourFavoritedData = yield call(postDataToServer2, token, slug);
    
    console.log(yourFavoritedData.article.favoritesCount);
    // 同时带两个参数
    // yield put(yourFavoritedCountLoaded(yourFavoritedData.articles));
  });
};

const postDataToServer2 = (token, slug) => {
  return fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    // body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(response => {
      console.log("-- Post Your Favorited Article Success —-", response);
      return response;
    });
};

const postDataToServer1 = userData => {
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
      console.log("-- Post User Information Success —-", response);
      return response;
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
    }).then(response => {
    if (response.ok) {
      return response.json()
      .then(response => {
        console.log("-- Get Your Feeds Success -- :", response);
        return response;
      });
    } else console.error(" -- Error: get data failed -- ");
  });
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

