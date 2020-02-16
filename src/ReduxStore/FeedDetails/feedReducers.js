import {
  ARTICLE_DATA_LOADED,
  TAGS_DATA_LOADED,
  ARTICLE_TITLE_CLICKED,
  ARTICLE_COMMENTS_LOADED,
  ARTICLE_CONTENT_LOADED,
  TAG_RELATED_ARTICLE_LOADED,
  RELATED_TAG_LOADED,
  USERS_PROFILE_LOADED,
  INITIALDATA_LOADED,
  USERS_RELATED_ARTICLES_LOADED,
  FAVERATED_ARITICLE_LOADED,
  USER_TOKEN_LOADED,
  YOURE_FEED_LOADED,
  GLOBAL_DATA_LOADED,
  SMALL_NAV_CLICKED,
  YOUR_FEED_NAV_CLICKED,
  SMALL_NAV_SET_CLICKED,
  YOURE_FEED_CLICKED
} from "./feedActions";

const initialState = {
  currentComments: {},
  currentArticleDetails: {},
  articleLibrary: [],
  globalFeeds:[],
  popularTags: [],
  currentArticleTitle: "",
  currentArticleSlug: "",
  currentProfileData: {},
  currentUsersArticles: [],
  favoritedArticles: [],
  tagRelatedArticles: null,
  currentTagName: "",
  userInfo: {}, // 暂定是null
  yourArticles: null,
  smallNavStatus: "active",
  selfStatus: "null",
  status1: "null",
  status2: "active",
  status3: "active"
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_DATA_LOADED:
      return { ...state, articleLibrary: action.articleData };

    case TAGS_DATA_LOADED:
      return { ...state, popularTags: action.tagsData };

    case ARTICLE_TITLE_CLICKED:
      return {
        ...state,
        currentArticleTitle: action.title,
        currentArticleSlug: action.slug
      };

    case ARTICLE_CONTENT_LOADED:
      return { ...state, currentArticleDetails: action.initArticleData };

    case ARTICLE_COMMENTS_LOADED:
      return { ...state, currentComments: action.initCommentData };

    case TAG_RELATED_ARTICLE_LOADED:
      return { ...state, tagRelatedArticles: action.tagRelatedArticles };

    case RELATED_TAG_LOADED:
      return { ...state, currentTagName: action.tagName };

    // YOURE_FEED_CLICKED
    case YOURE_FEED_CLICKED:
      return { ...state, currentTagName: null, tagRelatedArticles: null };

    case INITIALDATA_LOADED:
      return { ...state, currentTagName: "", tagRelatedArticles: null };

    // GLOBAL_DATA_LOADED
    case GLOBAL_DATA_LOADED:
      return { ...state, globalFeeds: action.payload };

    case USERS_PROFILE_LOADED:
      return { ...state, currentProfileData: action.userProfileData };

    case USERS_RELATED_ARTICLES_LOADED:
      return { ...state, currentUsersArticles: action.userRelatedArticles };

    case FAVERATED_ARITICLE_LOADED:
      return { ...state, favoritedArticles: action.favoritedArticles };

    case USER_TOKEN_LOADED:
      return { ...state, userInfo: action.userInfo };

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

    // SMALL_NAV_SET_CLICKED
    case SMALL_NAV_SET_CLICKED:
      return {
        ...state,
        status1: action.status1,
        status2: action.status2,
        status3: action.status3
      };

    default:
      return state;
  }
};
