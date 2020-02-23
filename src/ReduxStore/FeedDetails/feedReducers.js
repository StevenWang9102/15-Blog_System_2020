import {
  ARTICLE_DATA_LOADED,
  TAGS_DATA_LOADED,
  ARTICLE_TITLE_CLICKED,
  ARTICLE_COMMENTS_LOADED,
  INIT_ARTICLE_DETAILS_GET,
  ARTICLE_CONTENT_LOADED,
  TAG_RELATED_ARTICLE_LOADED,
  RELATED_TAG_LOADED,
  USERS_PROFILE_LOADED,
  LOG_OUT_BUTTON_CLICK,
  LOAD_GLOBAL_FEEDS,
  USERS_RELATED_ARTICLES_LOADED,
  FAVERATED_ARITICLE_LOADED,
  UPDATED_YOUR_SETTING,
  USER_INFORMATION_LOADED,
  CURRENT_PROFILE_ARTICLE_LOADED,
  YOURE_FEED_LOADED,
  SET_LOG_IN_STSTUS,
  SMALL_NAV_CLICKED,
  YOUR_FEED_NAV_CLICKED,
  DELETE_YOUR_ARTICLE_DONE,
  HOME_NAV_SET_CLICKED,
  YOURE_FEED_CLICKED,
  CURRENT_HOME_DISPLAY_ARTICLES_LOADED,
  ARTICLE_RELOADED,
  ON_EDIT_ARTICLE_CLICKED,
  SET_PROFILE_NAV
} from "./feedActions";

const initialState = {
  currentComments: {},
  currentArticleDetails: {},
  globalArticles: [],
  popularTags: [],
  currentArticleTitle: "",
  currentArticleSlug: "",
  currentProfileData: {},
  currentUsersArticles: [],
  favoritedArticles: null,
  tagRelatedArticles: null,
  currentTagName: "",
  userInformation: {},
  yourArticles: null,
  smallNavStatus: "active",
  selfStatus: "null",
  article_reloaded: false,
  myNav: "active",
  favorited_Nav: "null",
  currentDisplayArticle: [],
  currentHomeDisplayArticle: []
};

export const feedReducer = (state = initialState, action) => {
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
        newSlug: action.initArticleData.slug
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

    case YOURE_FEED_CLICKED:
      return { ...state, currentTagName: null, tagRelatedArticles: null };

    case LOAD_GLOBAL_FEEDS:
      return { ...state, currentTagName: "", tagRelatedArticles: null };

    // case GLOBAL_DATA_LOADED:
    //   return { ...state, globalFeeds: action.payload };

    case USERS_PROFILE_LOADED:
      return { ...state, currentProfileData: action.userProfileData };

    case USERS_RELATED_ARTICLES_LOADED:
      return {
        ...state,
        currentUsersArticles: action.userRelatedArticles,
        currentDisplayArticle: action.userRelatedArticles
      };

    case FAVERATED_ARITICLE_LOADED:
      return { ...state, favoritedArticles: action.favoritedArticles };

    case USER_INFORMATION_LOADED:
      return { ...state, userInformation: action.userInformation };

    case YOURE_FEED_LOADED:
      return { ...state, yourArticles: action.articles };

    case SMALL_NAV_CLICKED:
      return { ...state, smallNavStatus: action.status };

    case YOUR_FEED_NAV_CLICKED:
      return {
        ...state,
        selfStatus: action.selfStatus,
        tagRelatedArticles: null
      };

    case HOME_NAV_SET_CLICKED:
      return {
        ...state,
        homeNavStatus: action.status
      };
    case INIT_ARTICLE_DETAILS_GET:
      return { ...state, currentSlug: action.slug };

    case ARTICLE_RELOADED:
      return { ...state, article_reloaded: action.status };

    // ON_EDIT_ARTICLE_CLICKED
    case ON_EDIT_ARTICLE_CLICKED:
      return { ...state, article_reloaded: action.status };

    // SET_PROFILE_NAV
    case SET_PROFILE_NAV:
      return {
        ...state,
        profileNavStatus: action.profileNavStatus
      };

    // CURRENT_PROFILE_ARTICLE_LOADED
    case CURRENT_PROFILE_ARTICLE_LOADED:
      return { ...state, currentDisplayArticle: action.userProfileData };
    //  CURRENT_HOME_DISPLAY_ARTICLES_LOADED
    case CURRENT_HOME_DISPLAY_ARTICLES_LOADED:
      return { ...state, currentHomeDisplayArticle: action.payload };

    // SET_LOG_IN_STSTUS
    case SET_LOG_IN_STSTUS:
      return { ...state, loginStatus: action.loginStatus };
    
    case LOG_OUT_BUTTON_CLICK:
      return { ...state, loginStatus: action.loginStatus };

    case UPDATED_YOUR_SETTING:
      return { ...state, yourSettingStatus: action.status };

    //  DELETE_YOUR_ARTICLE_DONE
    case DELETE_YOUR_ARTICLE_DONE:
      return { ...state, deleteYourArticleStatus: action.status };
      
    default:
      return state;
  }
};
