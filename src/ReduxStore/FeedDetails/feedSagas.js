import { takeLatest, put, call, select, all} from "redux-saga/effects";
import { getUser, setUser } from '../../Components/UserComponent/AuthToken'
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
} from "./feedActions";

export const getUserInformation = function(state){  
  // const reduxStoredUserInfo = yield select(state => state.userInfo);
  // if(reduxStoredUserInfo) return reduxStoredUserInfo
  // else 
  // put到redux store...
  return getUser() 
}

export const feedSaga = function*() {

  // GLOBAL_FEEDS_LOADED
  yield takeLatest(INITIALDATA_LOADED, function*() {
    // const token = yield select(state => state.userInfo)
    const initArticData = yield call(
      fetchInitialData,
      "/articles?limit=50&offset=10"
    );
    //
    yield put(articleDataLoaded(initArticData["articles"]));
    yield put(globalDataLoaded(initArticData["articles"]));


    const initTagData = yield call(fetchInitialData, "/tags");
    yield put(tagsDataLoaded(initTagData["tags"]));
  });

  // ARTICLE_COMMENT_LOADED
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
    // USER PROFILE LOADED
      // USER PROFILE LOADED
        // USER PROFILE LOADED
          // USER PROFILE LOADED
            // USER PROFILE LOADED
              // USER PROFILE LOADED

  yield takeLatest(USERS_NAME_LOADED, function*(action) {

    const [userProfileData, userRelatedArticles] = yield all ([
      call(fetchInitialData, `/profiles/${action.userName}`),
      call( fetchInitialData, `/articles?author=${action.userName}&limit=5&offset=0`)
    ])
    
    console.log(userProfileData);
    console.log(userRelatedArticles.articles);
    
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
    const url = '/users/login';

    userData.email = action.email;
    userData.password = action.password;
    
    const postData = { user: userData };
    const userPostedData = yield call(postDataToServerAll, null , url, postData );

    console.log(userPostedData);
    
    // tag Session Storage
    setUser(userPostedData.user) 
    yield put(userTokedLoaded(userPostedData));
    yield put(setNavStatus('active', 'null', 'null'));
  });

  // YOURE_FEED_CLICKED
  yield takeLatest(YOURE_FEED_CLICKED, function*(action) {
    const token = getUserInformation().token;
    const yourArticleData = yield call(getDataFromServerWithToken, token);
    console.log(yourArticleData);
    
    yield put(yourFeedsLoaded(yourArticleData.articles));
  });

  // FAVORITED_BUTTON_CLICKED 
  yield takeLatest(FAVORITED_BUTTON_CLICKED, function*(action) {
    const slug = action.slug
    const token = action.token
    const url = `/articles/${slug}/favorite`
    const yourFavoritedData = yield call(postDataToServerAll, token, url);
    console.log(yourFavoritedData);
    
    // 此处喜欢要加一
    // 此处喜欢要加一
    // 此处喜欢要加一
  });

  // POST_COMMENTS_CLICKED
  yield takeLatest(POST_COMMENTS_CLICKED, function*(action) {
    const token = getUserInformation().token;
    const url = `/articles/${action.slug}/comments`
    const postData={}
    postData.comment = {body:`${action.myComment}`}
    const yourPostData = yield call(postDataToServerAll, token, url, postData);
    console.log(yourPostData);    
  });

  // POST_ARTICLE_CLICKED
  yield takeLatest(POST_ARTICLE_CLICKED, function*(action) {

    const token = getUserInformation().token;
    const url = '/articles' ;
    const postData = {}

    postData.article = {
      title:`${action.title}`, 
      description:`${action.description}`,
      body:`${action.content}`,
      tagList:`${action.tags}`,
    }

    const postArticleData = yield call(postDataToServerAll, token, url, postData );
    console.log(postArticleData);
  });
};

const postDataToServerAll = (token, url, postData) => {
  // 
  let authorization = `Authorization: Token ${token}`
  if( token === null ) authorization = ''
  
  console.log(authorization);
  
  return fetch(
    `https://conduit.productionready.io/api${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization
    },
    body: JSON.stringify(postData)
  })
    .then(response => {
      if (response.ok) {
        return response.json()
        .then(response => {
          // if(url.indexOf('favorite')>=0) console.log(" -- Post Your Favorite Article Success -- ", response);
          // else if(url.indexOf('comments')>=0) console.log(" -- Post Your Comments Success --  ", response);
          // else if(url.indexOf('articles')>=0 && url.indexOf('comments')===-1 ) console.log(" -- Post Your Comments Success --  ", response);
          // else if(token === null ) console.log(" -- SIGN IN SUCCESS —- ", response);          
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
        console.log(' -- Get Data Success -- ')
        return response.json();
      } else console.error(" -- Error: get data failed -- ");
    }
  );
};

