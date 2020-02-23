export const LOAD_GLOBAL_FEEDS = Symbol("LOAD_GLOBAL_FEEDS");
export const ARTICLE_DATA_LOADED = Symbol("ARTICLE_DATA_LOADED")
export const TAGS_DATA_LOADED = Symbol("TAGS_DATA_LOADED")
export const ARTICLE_TITLE_CLICKED = Symbol("ARTICLE_TITLE_CLICKED")
export const INIT_ARTICLE_DETAILS_GET = Symbol("INIT_ARTICLE_DETAILS_GET")
export const ARTICLE_COMMENTS_LOADED = Symbol("ARTICLE_COMMENTS_LOADED")
export const ARTICLE_CONTENT_LOADED = Symbol("ARTICLE_CONTENT_LOADED")
export const POPULAR_TAG_CLICKED = Symbol("POPULAR_TAG_CLICKED")
export const POPULAR_TAG_DISPLAYED = Symbol("POPULAR_TAG_DISPLAYED")
export const TAG_RELATED_ARTICLE_LOADED = Symbol("TAG_RELATED_ARTICLE_LOADED")
export const RELATED_TAG_LOADED = Symbol("RELATED_TAG_LOADED")
export const GLOBLE_FEED_CLICKED = Symbol("GLOBLE_FEED_CLICKED")
export const LOADED_USER_PROFILE = Symbol("LOADED_USER_PROFILE")
export const USERS_PROFILE_LOADED = Symbol("USERS_PROFILE_LOADED")
export const USERS_RELATED_ARTICLES_LOADED = Symbol("USERS_RELATED_ARTICLES_LOADED")
export const FAVERATED_ARITICLE_CLICKED = Symbol("FAVERATED_ARITICLE_CLICKED")
export const FAVERATED_ARITICLE_LOADED = Symbol("FAVERATED_ARITICLE_LOADED")
export const SIGN_IN_BUTTON_CLICKED = Symbol("SIGN_IN_BUTTON_CLICKED")
export const USER_INFORMATION_LOADED = Symbol("USER_INFORMATION_LOADED")
export const USER_TOKEN_NAME_LOADED = Symbol("USER_TOKEN_NAME_LOADED")
export const YOURE_FEED_CLICKED = Symbol("YOURE_FEED_CLICKED")
export const YOURE_FEED_LOADED = Symbol("YOURE_FEED_LOADED")
export const FAVORITED_BUTTON_CLICKED = Symbol("FAVORITED_BUTTON_CLICKED")
export const SMALL_NAV_CLICKED = Symbol("SMALL_NAV_CLICKED")
export const YOUR_FEED_NAV_CLICKED = Symbol("YOUR_FEED_NAV_CLICKED")
export const HOME_NAV_SET_CLICKED = Symbol("HOME_NAV_SET_CLICKED")
export const GLOBAL_DATA_LOADED = Symbol("GLOBAL_DATA_LOADED")
export const POST_COMMENTS_CLICKED = Symbol("POST_COMMENTS_CLICKED")
export const POST_ARTICLE_CLICKED = Symbol("POST_ARTICLE_CLICKED")
export const ARTICLE_RELOADED = Symbol("ARTICLE_RELOADED")
export const ON_EDIT_ARTICLE_CLICKED = Symbol("ON_EDIT_ARTICLE_CLICKED")
export const SET_PROFILE_NAV = Symbol("SET_PROFILE_NAV")
export const CURRENT_PROFILE_ARTICLE_LOADED = Symbol("CURRENT_PROFILE_ARTICLE_LOADED")
export const CURRENT_HOME_DISPLAY_ARTICLES_LOADED = Symbol("CURRENT_HOME_DISPLAY_ARTICLES_LOADED")
export const LOAD_INIT_POPULAR_TAGS = Symbol("LOAD_INIT_POPULAR_TAGS")
export const SAVE_USER_INFOR_TO_STORE = Symbol("SAVE_USER_INFOR_TO_STORE")
export const SET_LOG_IN_STSTUS = Symbol("SET_LOG_IN_STSTUS")
export const LOG_OUT_BUTTON_CLICK = Symbol("LOG_OUT_BUTTON_CLICK")
export const UPDATE_SETTING_BUTTON_CLICK = Symbol("UPDATE_SETTING_BUTTON_CLICK")
// UPDATED_YOUR_SETTING
export const UPDATED_YOUR_SETTING = Symbol("UPDATED_YOUR_SETTING")
// DELETE_ARTICLE_BUTTON
export const DELETE_ARTICLE_BUTTON = Symbol("DELETE_ARTICLE_BUTTON")
// DELETE_YOUR_ARTICLE_DONE
export const DELETE_YOUR_ARTICLE_DONE = Symbol("DELETE_YOUR_ARTICLE_DONE")




// ---------------------------     Functions     --------------------------------
export const loadGlobalFeeds = () => {
    return { type: LOAD_GLOBAL_FEEDS };
};

export const globalDataLoaded = (payload) => {
    return { type: GLOBAL_DATA_LOADED, payload  };
};

export const loadInitArticleDetail = (slug) =>{
    return { type: INIT_ARTICLE_DETAILS_GET, slug };
}

export const articleDataLoaded = (articleData) =>{
    return { type: ARTICLE_DATA_LOADED, articleData};
}

export const articleContentLoaded = (initArticleData) => {
    return { type: ARTICLE_CONTENT_LOADED, initArticleData};
}

export const tagsDataLoaded = (tagsData) =>{
    return { type: TAGS_DATA_LOADED, tagsData};
}

export const articleCommentsLoaded = (initCommentData) =>{
    return { type: ARTICLE_COMMENTS_LOADED, initCommentData};
}

export const articleTitleClicked = (title, slug) => {
    return { type: ARTICLE_TITLE_CLICKED, title, slug };
}

export const popularTagClicked = (tagName) => {
    return { type: POPULAR_TAG_CLICKED, tagName }; 
}

export const popularTagIsDiplayed = (tagName) => {
    return { type: POPULAR_TAG_DISPLAYED, tagName }; 
}

export const tagRelatedArticleLoaded = (tagRelatedArticles) => {
    return { type: TAG_RELATED_ARTICLE_LOADED, tagRelatedArticles };
}

export const globeFeedClicked = () => {
    return { type: GLOBLE_FEED_CLICKED };
}

export const relatedTagLoaded = (tagName) => {
    return { type: RELATED_TAG_LOADED, tagName };
}

export const loadUserProfileDetail = () => {
    return { type: LOADED_USER_PROFILE };
}

export const userProfileDataLoaded = (userProfileData) => {
    return { type: USERS_PROFILE_LOADED, userProfileData };
}
// currentDisplayArticleLoaded
export const currentDisplayArticleLoaded = (userProfileData) => {
    return { type: CURRENT_PROFILE_ARTICLE_LOADED, userProfileData };
}

export const userRelatedArticlesLoaded = (userRelatedArticles) => {
    return { type: USERS_RELATED_ARTICLES_LOADED, userRelatedArticles };
}

export const favoritedArticleClicked = (userName) => {
    return { type: FAVERATED_ARITICLE_CLICKED, userName };
}

export const favoritedArticleLoaded = (favoritedArticles) => {
    return { type: FAVERATED_ARITICLE_LOADED, favoritedArticles };
}

export const signInClicked = (email, password) => {
    return { type: SIGN_IN_BUTTON_CLICKED, email: email, password: password };
}

export const userInformationLoaded = (payload) => {
    return { type: USER_INFORMATION_LOADED, userInformation: payload.user };

}

export const loadYourArticles = () => {
    return { type: YOURE_FEED_CLICKED };
}

export const yourFeedsLoaded = (articles) => {
    return { type: YOURE_FEED_LOADED, articles: articles };
}


export const favoritedButtonClicked = (token, slug) => {
    return { type: FAVORITED_BUTTON_CLICKED, token: token, slug: slug};
}

export const smallNavClicked = (status) => {
    return { type: SMALL_NAV_CLICKED, status:status };
}

export const yourFeedNavClicked = (self) => {
    return { type: YOUR_FEED_NAV_CLICKED, selfStatus: self };
}

export const setHomeNavStatus = (status ) => {
    return { type: HOME_NAV_SET_CLICKED, status: status };
}

export const onPostCommentsClicked = (slug, myComment) => {
    return { type: POST_COMMENTS_CLICKED, slug: slug, myComment: myComment };
}

export const onPostArticleClicked = (title, description, content, tags, slug ) => {
    return { type: POST_ARTICLE_CLICKED, title:title, description:description, content:content, tags:tags, slug:slug };
}

export const articleReloaded = (status) => {
    return { type: ARTICLE_RELOADED, status: status};
}

export const onEditArticleClicked = (status) => {
    return { type: ON_EDIT_ARTICLE_CLICKED, status: status};
}

export const setProfileNavStatus = (profileNavStatus) => {
    return { type: SET_PROFILE_NAV, profileNavStatus: profileNavStatus};
}

export const currentHomeDisplayArticleLoaded = (payload) => {
    return { type: CURRENT_HOME_DISPLAY_ARTICLES_LOADED, payload: payload };
}

export const loadPopularTags = (payload) => {
    return { type: LOAD_INIT_POPULAR_TAGS, payload: payload };
}

export const saveUserInformationToStore = (userInformation) => {
    return { type: SAVE_USER_INFOR_TO_STORE, userInformation: userInformation };
}
export const setLogInStatus = (status) => {
    return { type: SET_LOG_IN_STSTUS, loginStatus: status };
}

export const logOutButtonClicked = (status) => {
    return { type: LOG_OUT_BUTTON_CLICK, loginStatus: status };
}

export const onUpdateSettingClicked = (request) => {
    return { type: UPDATE_SETTING_BUTTON_CLICK, request: request };
}

// updatedYourSetting
export const updatedYourSetting = (status) => {
    return { type: UPDATED_YOUR_SETTING, status: status };
}
// onDeleteArticleClicked

export const onDeleteArticleClicked = (slug) => {
    return { type: DELETE_ARTICLE_BUTTON, slug: slug };
}
// deleteYourArticle
export const deleteYourArticle = (status) => {
    return { type: DELETE_YOUR_ARTICLE_DONE, status: status };
}