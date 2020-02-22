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
  CHECK_USER_INFO_POSITION,
  articleReloaded,
  currentDisplayArticleLoaded,
  currentHomeDisplayArticleLoaded
} from "./feedActions";


export const getUserInformation = function () {
  return getUser();
};

export const getUserInformation2 = function*(){
  // 优先使用state存user信息
  // 
  const reduxStoredUserInfo = yield select(state => state.userInfo);
  if(!reduxStoredUserInfo) {
    const sessionStoredUserInfo = getUser();
    if(sessionStoredUserInfo)
    yield put(userTokedLoaded(sessionStoredUserInfo))
  }else{
    return reduxStoredUserInfo;
  }
  return getUser();
};


export const feedSaga = function*() {

  // CHECK_USER_INFO_POSITION
  yield takeLatest(CHECK_USER_INFO_POSITION, function*() {
      const reduxStoredUserInfo = yield select(state => state.userInfo);
      if(!reduxStoredUserInfo) {
        const sessionStoredUserInfo = getUser();
        if(sessionStoredUserInfo)
        yield put(userTokedLoaded(sessionStoredUserInfo))
      }else{
        // return reduxStoredUserInfo;
      }
      // return getUser();
  });

  // GLOBAL_FEEDS_LOADED
  yield takeLatest(INITIALDATA_LOADED, function*() {
    const initArticData = yield call(
      fetchInitialData,
      "/articles?limit=50&offset=10", "Load Initial Global Feeds"
    );
    yield put(articleDataLoaded(initArticData["articles"]));
    yield put(globalDataLoaded(initArticData["articles"]));
  });

  // POPULAR TAGS
  yield takeLatest(INITIALDATA_LOADED, function*() {
    const initTagData = yield call(fetchInitialData, "/tags", "Load Initial Popular Tags");
    yield put(tagsDataLoaded(initTagData["tags"]));
  });

  // ARTICLE_DETAILS_LOADED 
  yield takeLatest(INIT_ARTICLE_DETAILS_GET, function*(action) {
    const initArticleData = yield call(
      fetchInitialData,
      `/articles/${action.slug}`,
      "Load Article"
    );
    yield put(articleContentLoaded(initArticleData.article));
  });

  
  // ARTICLE_COMMENT_LOADED
  yield takeLatest(INIT_ARTICLE_DETAILS_GET, function*(action) {
    const initCommentData = yield call(
      fetchInitialData,
      `/articles/${action.slug}/comments`,
      "Load Article Comments"
    );
    
    yield put(articleCommentsLoaded(initCommentData));
  });

  // POST_COMMENTS_CLICKED
  yield takeLatest(POST_COMMENTS_CLICKED, function* (action) {
    const token = getUserInformation().token;
    const url = `/articles/${action.slug}/comments`;
    const postData = {};
    postData.comment = { body: `${action.myComment}` };
    yield call(postDataToServerAll, token, url, postData, "POST");
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
      `/articles?tag=${action.tagName}&limit=10&offset=0`,
      "Load Popular Tags"
    );
    yield put(tagRelatedArticleLoaded(tagRelatedData.articles));
    yield put(relatedTagLoaded(action.tagName));
  });

  // USER_PROFILE_LOADED 进行中。。。。。。。。。。。。。。。。。。
  // USER_PROFILE_LOADED 进行中。。。。。。。。。。。。。。。。。。
  // USER_PROFILE_LOADED 进行中。。。。。。。。。。。。。。。。。。
  yield takeLatest(USERS_NAME_LOADED, function*() {
    // yield getUserInformation2()
    const userName = getUserInformation().username;
    
    const [userProfileData, userRelatedArticles] = yield all([
      call(fetchInitialData, `/profiles/${userName}`, "Load User Profile"),
      call(
        fetchInitialData,
        `/articles?author=${userName}&limit=5&offset=0`, "Load User Articles"
      )]);
    console.log(userRelatedArticles);
    
    yield put(userProfileDataLoaded(userProfileData));
    yield put(userRelatedArticlesLoaded(userRelatedArticles.articles));
    yield put(currentDisplayArticleLoaded(userRelatedArticles.articles));

  });

  // FAVERATED_ARITICLE_CLICKED
    // FAVERATED_ARITICLE_CLICKED

  yield takeLatest(FAVERATED_ARITICLE_CLICKED, function*(action) {
    const userName = getUserInformation().username;
        const favoritedArticlesData = yield call(
      fetchInitialData,
      `/articles?favorited=${userName}&limit=5&offset=0`,
      "Load Your Favorited Articles"
    );

    console.log(favoritedArticlesData);
    
    yield put(favoritedArticleLoaded(favoritedArticlesData.articles));
    yield put(currentDisplayArticleLoaded(favoritedArticlesData.articles));
  });

  // SIGN_IN_BUTTON_CLICKED
  yield takeLatest(SIGN_IN_BUTTON_CLICKED, function*(action) {
    const userData = {};
    const url = "/users/login";
    const message = 'Sign in'

    userData.email = action.email;
    userData.password = action.password;

    const postData = { user: userData };
    const userPostedData = yield call(postDataToServerAll, null, url, postData, message, "POST");

    setUser(userPostedData.user);    
    yield put(userTokedLoaded(userPostedData));
    yield put(setNavStatus("active", "null", "null"));
  });

  // YOURE_FEED_CLICKED
  // YOURE_FEED_CLICKED
  // YOURE_FEED_CLICKED
  
  yield takeLatest(YOURE_FEED_CLICKED, function*() {
    yield getUserInformation2()
    const token = getUserInformation().token;
    const url ="/articles/feed?limit=10&offset=0";
    const message = "Your Feed Loaded"
    const yourArticleData = yield call(postDataToServerAll, token, url, null, message, "GET");
    yield put(yourFeedsLoaded(yourArticleData.articles));
    yield put(currentHomeDisplayArticleLoaded(yourArticleData.articles));

  });

  // FAVORITED_BUTTON_CLICKED
  yield takeLatest(FAVORITED_BUTTON_CLICKED, function*(action) {    
    const slug = action.slug;
    const token = action.token;
    const url = `/articles/${slug}/favorite`;
    const message = 'Post Favoriated Articles'
    yield call(postDataToServerAll, token, url, message, "POST");
  });

  // POST_ARTICLE_CLICKED
  yield takeLatest(POST_ARTICLE_CLICKED, function*(action) {
    
    const token = getUserInformation().token;
    const url = `/articles/${action.slug}`;
    const postData = {};
    const message = "Post an Article"

    postData.article = {
      title: `${action.title}`,
      description: `${action.description}`,
      body: `${action.content}`,
      tagList: `${action.tags}`
    };

    const yourArticle = yield call(postDataToServerAll, token, url, postData, message, "PUT");    
    // 重新发布一次post 文章
    console.log(yourArticle);
    yield put(articleContentLoaded(yourArticle.article));
    yield put(articleCommentsLoaded(yourArticle));
    yield put(articleReloaded(true))
  });
};

const postDataToServerAll = (token, url, postData, message, type) => {
  const headers = { "Content-Type": "application/json"}

  if(token !== null){
    headers["Authorization"] = `Token ${token}`;
  }   
  
  return fetch(`https://conduit.productionready.io/api${url}`, {
    method: `${type}`,
    headers,
    body: JSON.stringify(postData)
  }).then(response => {
    if (response.ok) {
      return response.json().then(response => {
        console.log(` -- Your ${message} Success —- `, response);
        return response;
      });
    } else console.error(` -- Your Error: ${message} failed -- `);
  });
};

const fetchInitialData = (url, message) => {
  return fetch("https://conduit.productionready.io/api" + url).then(
    response => {
      if (response.ok) {
        console.log(` -- ${message} Success -- `);
        return response.json();
      } else console.error(" -- Error: get data failed -- ");
    }
  );
};

// const getDataFromServerWithToken = token => {
//   return fetch(
//     "https://conduit.productionready.io/api/articles/feed?limit=10&offset=0",
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`
//       }
//     }
//   ).then(response => {
//     if (response.ok) {
//       return response.json().then(response => {
//         console.log(" -- Get Your Feeds Success -- :", response);
//         return response;
//       });
//     } else console.error(" -- Error: get data failed -- ");
//   });
// };