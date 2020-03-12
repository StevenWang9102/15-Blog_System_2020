import {
  ARTICLE_DATA_LOADED,
  TAGS_DATA_LOADED,
  ARTICLE_COMMENTS_LOADED,
  LOAD_INIT_ARTICLE_DETAIL,
  ARTICLE_CONTENT_LOADED,
  ARTICLE_SETTING_DETAIL_LOADED,
  SET_DELETE_ARTICLE,
  CURRENT_PROFILE_ARTICLE_LOADED,
  CURRENT_HOME_DISPLAY_ARTICLES_LOADED,
  LOAD_YOUR_FEED,
  LOAD_GLOBAL_FEEDS,
  POPULAR_TAG_CLICKED,
  DELETE_YOUR_ARTICLE_DONE,
  TAG_RELATED_ARTICLE_LOADED
} from "../Actions/articleActions";

const initialState = {
  currentComments: {},
  currentArticleDetails: {},
  popularTags: [],
  currentTagName: " ",
  currentProfileDisplayArticle: [],
  currentHomeDisplayArticle: []
};

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_DATA_LOADED:
      return {
        ...state,
        currentHomeDisplayArticle: action.articleData["articles"],
        articlesAllCount: action.articleData["articlesCount"]
      };

    case TAGS_DATA_LOADED:
      return { ...state, popularTags: action.tagsData };

    case TAG_RELATED_ARTICLE_LOADED:
      return { ...state, currentHomeDisplayArticle: action.data };

    case ARTICLE_CONTENT_LOADED:
      return {
        ...state,
        currentArticleDetails: action.initArticleData,
        newPosedArticleSlug: action.initArticleData.slug
      };

    case ARTICLE_COMMENTS_LOADED:
      return { ...state, currentComments: action.initCommentData };

    case LOAD_INIT_ARTICLE_DETAIL:
      return { ...state, currentSlug: action.slug };

    case CURRENT_PROFILE_ARTICLE_LOADED:
      return {
        ...state,
        currentProfileDisplayArticle: action.userProfileData.articles,
        articlesAllCount: action.userProfileData.articlesCount
      };

    case CURRENT_HOME_DISPLAY_ARTICLES_LOADED:
      return {
        ...state,
        currentHomeDisplayArticle: action.payload.articles,
        articlesAllCount: action.payload.articlesCount
      };

    case DELETE_YOUR_ARTICLE_DONE:
      return { ...state, deleteArticleDone: action.status };

    case SET_DELETE_ARTICLE:
      return { ...state, deleteArticleDone: action.status };

    case ARTICLE_SETTING_DETAIL_LOADED:
      return { ...state, articles_setting: action.data };

    case POPULAR_TAG_CLICKED:
      return { ...state, currentTagName: action.tagName };

    case LOAD_YOUR_FEED:
      return { ...state, currentTagName: null };

    case LOAD_GLOBAL_FEEDS:
      return { ...state, currentTagName: "" };

    default:
      return state;
  }
};
