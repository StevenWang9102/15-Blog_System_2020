export const LOAD_GLOBAL_FEEDS = Symbol("LOAD_GLOBAL_FEEDS");
export const ARTICLE_DATA_LOADED = Symbol("ARTICLE_DATA_LOADED");
export const TAGS_DATA_LOADED = Symbol("TAGS_DATA_LOADED");
export const ARTICLE_TITLE_CLICKED = Symbol("ARTICLE_TITLE_CLICKED");
export const LOAD_INIT_ARTICLE_DETAIL = Symbol("LOAD_INIT_ARTICLE_DETAIL");
export const ARTICLE_COMMENTS_LOADED = Symbol("ARTICLE_COMMENTS_LOADED");
export const ARTICLE_CONTENT_LOADED = Symbol("ARTICLE_CONTENT_LOADED");
export const POPULAR_TAG_CLICKED = Symbol("POPULAR_TAG_CLICKED");
export const POPULAR_TAG_DISPLAYED = Symbol("POPULAR_TAG_DISPLAYED");
export const TAG_RELATED_ARTICLE_LOADED = Symbol("TAG_RELATED_ARTICLE_LOADED");
export const RELATED_TAG_LOADED = Symbol("RELATED_TAG_LOADED");
export const GLOBLE_FEED_CLICKED = Symbol("GLOBLE_FEED_CLICKED");
export const LOADED_USER_PROFILE = Symbol("LOADED_USER_PROFILE");
export const USERS_PROFILE_LOADED = Symbol("USERS_PROFILE_LOADED");
export const USERS_RELATED_ARTICLES_LOADED = Symbol(  "USERS_RELATED_ARTICLES_LOADED" );
export const FAVERATED_NAV_CLICKED = Symbol("FAVERATED_NAV_CLICKED");
export const FAVERATED_ARITICLE_LOADED = Symbol("FAVERATED_ARITICLE_LOADED");
export const SIGN_IN_BUTTON_CLICKED = Symbol("SIGN_IN_BUTTON_CLICKED");
export const USER_INFORMATION_LOADED = Symbol("USER_INFORMATION_LOADED");
export const LOAD_YOUR_FEED = Symbol("LOAD_YOUR_FEED");
export const YOURE_FEED_LOADED = Symbol("YOURE_FEED_LOADED");
export const FAVORITED_BUTTON_CLICKED = Symbol("FAVORITED_BUTTON_CLICKED");
export const YOUR_FEED_NAV_CLICKED = Symbol("YOUR_FEED_NAV_CLICKED");
export const SET_HOME_NAV_STATUS = Symbol("SET_HOME_NAV_STATUS");
export const GLOBAL_FEED_DATA_LOADED = Symbol("GLOBAL_FEED_DATA_LOADED");
export const POST_COMMENTS_CLICKED = Symbol("POST_COMMENTS_CLICKED");
export const POST_ARTICLE_CLICKED = Symbol("POST_ARTICLE_CLICKED");
export const POSTED_ARTICLE_RELOADED = Symbol("POSTED_ARTICLE_RELOADED");
export const EDIT_ARTICLE_BUTTON_CLICKED = Symbol(
  "EDIT_ARTICLE_BUTTON_CLICKED"
);
export const SET_PROFILE_NAV = Symbol("SET_PROFILE_NAV");
export const CURRENT_PROFILE_ARTICLE_LOADED = Symbol(
  "CURRENT_PROFILE_ARTICLE_LOADED"
);
export const CURRENT_HOME_DISPLAY_ARTICLES_LOADED = Symbol(
  "CURRENT_HOME_DISPLAY_ARTICLES_LOADED"
);
export const LOAD_POPULAR_TAGS = Symbol("LOAD_POPULAR_TAGS");
export const SAVE_USER_INFOR_TO_STORE = Symbol("SAVE_USER_INFOR_TO_STORE");
export const SET_LOG_IN_STSTUS = Symbol("SET_LOG_IN_STSTUS");
export const LOG_OUT_BUTTON_CLICK = Symbol("LOG_OUT_BUTTON_CLICK");
export const UPDATE_SETTING_BUTTON_CLICK = Symbol(
  "UPDATE_SETTING_BUTTON_CLICK"
);
export const UPDATED_YOUR_SETTING = Symbol("UPDATED_YOUR_SETTING");
export const DELETE_ARTICLE_BUTTON = Symbol("DELETE_ARTICLE_BUTTON");
export const DELETE_YOUR_ARTICLE_DONE = Symbol("DELETE_YOUR_ARTICLE_DONE");
export const SIGN_UP_BUTTON_CLICK = Symbol("SIGN_UP_BUTTON_CLICK");
export const SIGN_UP_USER_LOADED = Symbol("SIGN_UP_USER_LOADED");
export const LOAD_ARTICLE_SETTING_DETAIL = Symbol(
  "LOAD_ARTICLE_SETTING_DETAIL"
);
export const ARTICLE_SETTING_DETAIL_LOADED = Symbol(
  "ARTICLE_SETTING_DETAIL_LOADED"
);


// ---------------------------     Functions     --------------------------------
export const loadGlobalFeeds = () => {
  return { type: LOAD_GLOBAL_FEEDS };
};

export const globalDataLoaded = payload => {
  return { type: GLOBAL_FEED_DATA_LOADED, payload };
};

export const loadInitArticleDetail = slug => {
  return { type: LOAD_INIT_ARTICLE_DETAIL, slug };
};

export const articleDataLoaded = articleData => {
  return { type: ARTICLE_DATA_LOADED, articleData };
};

export const articleContentLoaded = initArticleData => {
  return { type: ARTICLE_CONTENT_LOADED, initArticleData };
};

export const tagsDataLoaded = tagsData => {
  return { type: TAGS_DATA_LOADED, tagsData };
};

export const articleCommentsLoaded = initCommentData => {
  return { type: ARTICLE_COMMENTS_LOADED, initCommentData };
};

export const articleTitleClicked = (title, slug) => {
  return { type: ARTICLE_TITLE_CLICKED, title, slug };
};

export const popularTagClicked = tagName => {
  return { type: POPULAR_TAG_CLICKED, tagName };
};

export const popularTagIsDiplayed = tagName => {
  return { type: POPULAR_TAG_DISPLAYED, tagName };
};

export const tagRelatedArticleLoaded = tagRelatedArticles => {
  return { type: TAG_RELATED_ARTICLE_LOADED, tagRelatedArticles };
};

export const globeFeedClicked = () => {
  return { type: GLOBLE_FEED_CLICKED };
};

// export const relatedTagLoaded = tagName => {
//   return { type: RELATED_TAG_LOADED, tagName };
// };

export const loadUserProfileDetail = author_name => {
  return { type: LOADED_USER_PROFILE, author_name: author_name };
};

export const userProfileDataLoaded = userProfileData => {
  return { type: USERS_PROFILE_LOADED, userProfileData };
};

export const currentDisplayArticleLoaded = userProfileData => {
  return { type: CURRENT_PROFILE_ARTICLE_LOADED, userProfileData };
};

export const userRelatedArticlesLoaded = userRelatedArticles => {
  return { type: USERS_RELATED_ARTICLES_LOADED, userRelatedArticles };
};

export const favoritedArticleNavClicked = author_name => {
  return { type: FAVERATED_NAV_CLICKED, author_name: author_name };
};

export const favoritedArticleLoaded = favoritedArticles => {
  return { type: FAVERATED_ARITICLE_LOADED, favoritedArticles };
};

export const signInClicked = (email, password) => {
  return { type: SIGN_IN_BUTTON_CLICKED, email: email, password: password };
};

export const userInformationLoaded = payload => {
  return { type: USER_INFORMATION_LOADED, userInformation: payload.user };
};

export const loadYourArticles = () => {
  return { type: LOAD_YOUR_FEED };
};

export const yourFeedsLoaded = articles => {
  return { type: YOURE_FEED_LOADED, articles: articles };
};

export const favoritedButtonClicked = (
  token,
  slug,
  httpMethod,
  author_name
) => {
  return {
    type: FAVORITED_BUTTON_CLICKED,
    token: token,
    slug: slug,
    httpMethod: httpMethod,
    author_name
  };
};

export const yourFeedNavClicked = self => {
  return { type: YOUR_FEED_NAV_CLICKED, selfStatus: self };
};

export const setHomeNavStatus = (your, favorite, popular) => {
  return { type: SET_HOME_NAV_STATUS, your:your, favorite:favorite, popular:popular};
};

export const onPostCommentsClicked = (slug, myComment) => {
  return { type: POST_COMMENTS_CLICKED, slug: slug, myComment: myComment };
};

export const onPostArticleClicked = (
  title,
  description,
  content,
  tags,
  slug
) => {
  return {
    type: POST_ARTICLE_CLICKED,
    title: title,
    description: description,
    content: content,
    tags: tags,
    slug: slug
  };
};

export const postedArticleReloaded = status => {
  return { type: POSTED_ARTICLE_RELOADED, status: status };
};

export const onEditArticleClicked = status => {
  return { type: EDIT_ARTICLE_BUTTON_CLICKED, status: status };
};

export const setProfileNavStatus = (
  profileNavStatusLeft,
  profileNavStatusRight
) => {
  return {
    type: SET_PROFILE_NAV,
    profileNavStatusLeft: profileNavStatusLeft,
    profileNavStatusRight: profileNavStatusRight
  };
};

export const currentHomeDisplayArticleLoaded = payload => {
  return { type: CURRENT_HOME_DISPLAY_ARTICLES_LOADED, payload: payload };
};

export const loadPopularTags = payload => {
  return { type: LOAD_POPULAR_TAGS, payload: payload };
};

export const saveUserInformationToStore = userInformation => {
  return { type: SAVE_USER_INFOR_TO_STORE, userInformation: userInformation };
};

export const logOutButtonClicked = status => {
  return { type: LOG_OUT_BUTTON_CLICK, loginStatus: status };
};

export const onUpdateSettingClicked = request => {
  return { type: UPDATE_SETTING_BUTTON_CLICK, request: request };
};

export const updatedYourSetting = status => {
  return { type: UPDATED_YOUR_SETTING, status: status };
};

export const onDeleteArticleClicked = slug => {
  return { type: DELETE_ARTICLE_BUTTON, slug: slug };
};

export const deleteYourArticle = status => {
  return { type: DELETE_YOUR_ARTICLE_DONE, status: status };
};

export const onSignUpButtonClicked = (userName, email, password) => {
  return {
    type: SIGN_UP_BUTTON_CLICK,
    userName: userName,
    email: email,
    password: password
  };
};

export const signUpUserLoaded = data => {
  return { type: SIGN_UP_USER_LOADED, data: data };
};

export const loadArticleSettingDetail = slug => {
  return { type: LOAD_ARTICLE_SETTING_DETAIL, slug: slug };
};

export const articleSettingContentLoaded = data => {
  return { type: ARTICLE_SETTING_DETAIL_LOADED, data: data };
};
