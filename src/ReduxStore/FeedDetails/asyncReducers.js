import {
  ARTICLE_DATA_LOADED,
  TAGS_DATA_LOADED,
  ARTICLE_TITLE_CLICKED,
  ARTICLE_COMMENTS_LOADED,
  LOAD_INIT_ARTICLE_DETAIL,
  ARTICLE_CONTENT_LOADED,
  TAG_RELATED_ARTICLE_LOADED,
  ARTICLE_SETTING_DETAIL_LOADED,
  RELATED_TAG_LOADED,
  USERS_PROFILE_LOADED,
  USERS_RELATED_ARTICLES_LOADED,
  FAVERATED_ARITICLE_LOADED,
  USER_INFORMATION_LOADED,
  CURRENT_PROFILE_ARTICLE_LOADED,
  YOUR_FEED_NAV_CLICKED,
  CURRENT_HOME_DISPLAY_ARTICLES_LOADED,
} from "./feedActions";

const initialState = {
  currentComments: {},
  currentArticleDetails: {},
  globalArticles: [],
  popularTags: [],
  currentArticleTitle: "",
  currentArticleSlug: "",
  currentProfileDetail: {},
  currentUsersArticles: [],
  favoritedArticles: null,
  tagRelatedArticles: null,
  currentTagName: "",
  userInformation: {},
  currentProfileDisplayArticle: [],
  currentHomeDisplayArticle: [],
};

export const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_DATA_LOADED:
      return {
        ...state,
        globalArticles: action.articleData,
        currentHomeDisplayArticle: action.articleData
      };

    case TAGS_DATA_LOADED:
      return { ...state, popularTags: action.tagsData };

    case ARTICLE_TITLE_CLICKED:
      return {
        ...state,
        currentArticleTitle: action.title,
        currentArticleSlug: action.slug
      };

    case ARTICLE_CONTENT_LOADED:
      return {
        ...state,
        currentArticleDetails: action.initArticleData,
        newPosedArticleSlug: action.initArticleData.slug
      };

    case ARTICLE_COMMENTS_LOADED:
      return { ...state, currentComments: action.initCommentData };

    case TAG_RELATED_ARTICLE_LOADED:
      return {
        ...state,
        tagRelatedArticles: action.tagRelatedArticles,
        currentHomeDisplayArticle: action.tagRelatedArticles
      };

    case RELATED_TAG_LOADED:
      return { ...state, currentTagName: action.tagName };

    case USERS_PROFILE_LOADED:
      return { ...state, currentProfileDetail: action.userProfileData };

    case USERS_RELATED_ARTICLES_LOADED:
      return {
        ...state,
        currentUsersArticles: action.userRelatedArticles,
        currentProfileDisplayArticle: action.userRelatedArticles
      };

    case FAVERATED_ARITICLE_LOADED:
      return { ...state, favoritedArticles: action.favoritedArticles };

    case USER_INFORMATION_LOADED:
      return { ...state, userInformation: action.userInformation };

    case YOUR_FEED_NAV_CLICKED:
      return {
        ...state,
        tagRelatedArticles: null
      };

    case LOAD_INIT_ARTICLE_DETAIL:
      return { ...state, currentSlug: action.slug };

    case CURRENT_PROFILE_ARTICLE_LOADED:
      return { ...state, currentProfileDisplayArticle: action.userProfileData };

    case CURRENT_HOME_DISPLAY_ARTICLES_LOADED:
      return { ...state, currentHomeDisplayArticle: action.payload };

    case ARTICLE_SETTING_DETAIL_LOADED:
      return { ...state, articles_setting: action.data };

    default:
      return state;
  }
};
