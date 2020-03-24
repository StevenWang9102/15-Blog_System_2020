export const LOAD_GLOBAL_FEEDS = Symbol("LOAD_GLOBAL_FEEDS");
export const ARTICLE_DATA_LOADED = Symbol("ARTICLE_DATA_LOADED");
export const LOAD_INIT_ARTICLE_DETAIL = Symbol("LOAD_INIT_ARTICLE_DETAIL");
export const TAGS_DATA_LOADED = Symbol("TAGS_DATA_LOADED");
export const ARTICLE_TITLE_CLICKED = Symbol("ARTICLE_TITLE_CLICKED");
export const ARTICLE_COMMENTS_LOADED = Symbol("ARTICLE_COMMENTS_LOADED");
export const ARTICLE_CONTENT_LOADED = Symbol("ARTICLE_CONTENT_LOADED");
export const GLOBAL_FEED_DATA_LOADED = Symbol("GLOBAL_FEED_DATA_LOADED");
export const LOAD_YOUR_FEED = Symbol("LOAD_YOUR_FEED");
export const POPULAR_TAG_CLEAN = Symbol("POPULAR_TAG_CLEAN");
export const YOUR_FEED_LOADED = Symbol("YOUR_FEED_LOADED");
export const DELETE_YOUR_ARTICLE_DONE = Symbol("DELETE_YOUR_ARTICLE_DONE");
export const LOAD_ARTICLE_SETTING_DETAIL = Symbol(
  "LOAD_ARTICLE_SETTING_DETAIL"
);
export const ARTICLE_SETTING_DETAIL_LOADED = Symbol(
  "ARTICLE_SETTING_DETAIL_LOADED"
);
export const POPULAR_TAG_CLICKED = Symbol("POPULAR_TAG_CLICKED");
export const POPULAR_TAG_DISPLAYED = Symbol("POPULAR_TAG_DISPLAYED");
export const RELATED_TAG_LOADED = Symbol("RELATED_TAG_LOADED");
export const CURRENT_HOME_DISPLAY_ARTICLES_LOADED = Symbol(
  "CURRENT_HOME_DISPLAY_ARTICLES_LOADED"
);
export const LOAD_POPULAR_TAGS = Symbol("LOAD_POPULAR_TAGS");
export const CURRENT_PROFILE_ARTICLE_LOADED = Symbol(
  "CURRENT_PROFILE_ARTICLE_LOADED"
);
export const SET_DELETE_ARTICLE = Symbol("SET_DELETE_ARTICLE");
export const TAG_RELATED_ARTICLE_LOADED = Symbol("TAG_RELATED_ARTICLE_LOADED");

// --------------------------- Functions --------------------------------
export const loadGlobalFeeds = (displayLimit, offset) => {
  return { type: LOAD_GLOBAL_FEEDS, displayLimit, offset };
};

export const tagRelatedArticleLoaded = data => {
  return { type: TAG_RELATED_ARTICLE_LOADED, data };
};

export const articleDataLoaded = articleData => {
  return { type: ARTICLE_DATA_LOADED, articleData };
};

export const loadInitArticleDetail = slug => {
  return { type: LOAD_INIT_ARTICLE_DETAIL, slug };
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

export const popularTagClicked = (tagName, displayLimit, offset) => {
  return { type: POPULAR_TAG_CLICKED, tagName, displayLimit, offset };
};

export const popularTagIsDiplayed = tagName => {
  return { type: POPULAR_TAG_DISPLAYED, tagName };
};

export const currentDisplayArticleLoaded = userProfileData => {
  return { type: CURRENT_PROFILE_ARTICLE_LOADED, userProfileData };
};

export const loadYourArticles = (displayLimit, offset) => {
  return { type: LOAD_YOUR_FEED, displayLimit, offset };
};

export const currentHomeDisplayArticleLoaded = payload => {
  return { type: CURRENT_HOME_DISPLAY_ARTICLES_LOADED, payload: payload };
};

export const loadPopularTags = () => {
  return { type: LOAD_POPULAR_TAGS };
};

export const deleteYourArticle = status => {
  return { type: DELETE_YOUR_ARTICLE_DONE, status: status };
};

export const setDeleteArticleStatus = status => {
  return { type: SET_DELETE_ARTICLE, status: status };
};

export const loadArticleSettingDetail = slug => {
  return { type: LOAD_ARTICLE_SETTING_DETAIL, slug: slug };
};

export const articleSettingContentLoaded = data => {
  return { type: ARTICLE_SETTING_DETAIL_LOADED, data: data };
};

// POPULAR_TAG_CLEAN
export const popularNavClean = () => {
  return { type: POPULAR_TAG_CLEAN };
};