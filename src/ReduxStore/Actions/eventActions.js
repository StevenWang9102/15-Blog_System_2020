export const FAVERATED_NAV_CLICKED = Symbol("FAVERATED_NAV_CLICKED");
export const FAVORITED_BUTTON_CLICKED = Symbol("FAVORITED_BUTTON_CLICKED");
export const YOUR_FEED_NAV_CLICKED = Symbol("YOUR_FEED_NAV_CLICKED");
export const SET_HOME_NAV_STATUS = Symbol("SET_HOME_NAV_STATUS");
export const POST_COMMENTS_CLICKED = Symbol("POST_COMMENTS_CLICKED");
export const POSTED_ARTICLE_RELOADED = Symbol("POSTED_ARTICLE_RELOADED");
export const UPDATED_YOUR_SETTING = Symbol("UPDATED_YOUR_SETTING");
export const FOLLOW_AUTHOR_CLICKED = Symbol("FOLLOW_AUTHOR_CLICKED");
export const SET_LOADING_LOADED = Symbol("SET_LOADING_LOADED");
export const EDIT_ARTICLE_BUTTON_CLICKED = Symbol(
  "EDIT_ARTICLE_BUTTON_CLICKED"
);
export const SET_PROFILE_NAV = Symbol("SET_PROFILE_NAV");
export const UPDATE_SETTING_BUTTON_CLICK = Symbol(
  "UPDATE_SETTING_BUTTON_CLICK"
);
export const EMPTY_ARTICLE_COUNT = Symbol("EMPTY_ARTICLE_COUNT");
export const DELETE_ARTICLE_BUTTON = Symbol("DELETE_ARTICLE_BUTTON");
export const POST_ARTICLE_CLICKED = Symbol("POST_ARTICLE_CLICKED");


// --------------------------- Functions --------------------------------
export const favoritedArticleNavClicked = (
  author_name,
  articleCountDisplay,
  articleOffSet
) => {
  return {
    type: FAVERATED_NAV_CLICKED,
    author_name,
    articleCountDisplay,
    articleOffSet
  };
};


export const favoritedButtonClicked = (
  token,
  slug,
  httpMethod,
  currentPageOffSet,
  name
) => {
  return {
    type: FAVORITED_BUTTON_CLICKED,
    token: token,
    slug: slug,
    httpMethod: httpMethod,
    currentPageOffSet:currentPageOffSet,
    name
  };
};

export const yourFeedNavClicked = self => {
  return { type: YOUR_FEED_NAV_CLICKED, selfStatus: self };
};

export const setHomeNavStatus = (your, favorite, popular) => {
  return {
    type: SET_HOME_NAV_STATUS,
    your: your,
    favorite: favorite,
    popular: popular
  };
};

export const onPostCommentsClicked = (slug, myComment) => {
  return { type: POST_COMMENTS_CLICKED, slug, myComment };
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

export const onUpdateSettingClicked = request => {
  return { type: UPDATE_SETTING_BUTTON_CLICK, request: request };
};

export const onFollowAuthorClick = (author_name, method) => {
  return {
    type: FOLLOW_AUTHOR_CLICKED,
    author_name: author_name,
    method: method
  };
};

export const setLoading = status => {
  return { type: SET_LOADING_LOADED, status };
};

export const emptyArticleAllCount = status => {
  return { type: EMPTY_ARTICLE_COUNT, status };
};

export const onDeleteArticleClicked = slug => {
  return { type: DELETE_ARTICLE_BUTTON, slug: slug };
};

export const updateSettingStatus = status => {
  return { type: UPDATED_YOUR_SETTING, status: status };
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