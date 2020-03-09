import {
  ARTICLE_DATA_LOADED,
  TAGS_DATA_LOADED,
  ARTICLE_COMMENTS_LOADED,
  LOAD_INIT_ARTICLE_DETAIL,
  ARTICLE_CONTENT_LOADED,
  TAG_RELATED_ARTICLE_LOADED,
  ARTICLE_SETTING_DETAIL_LOADED,
  CURRENT_PROFILE_ARTICLE_LOADED,
  CURRENT_HOME_DISPLAY_ARTICLES_LOADED,
  LOAD_YOUR_FEED,
  LOAD_GLOBAL_FEEDS,
  POPULAR_TAG_CLICKED,
  DELETE_YOUR_ARTICLE_DONE
} from "../Actions/articleActions";

const initialState = {
  currentComments: {},
  currentArticleDetails: {},
  globalArticles: [],
  popularTags: [],
  tagRelatedArticles: null,
  currentTagName: " ",
  currentProfileDisplayArticle: [],
  currentHomeDisplayArticle: [],
};

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_DATA_LOADED:
      return {
        ...state,
        globalArticles: action.articleData["articles"],
        currentHomeDisplayArticle: action.articleData["articles"],
        articleCount: action.articleData["articlesCount"],
        // loading: action.loading
      };

    case TAGS_DATA_LOADED:
      return { ...state, popularTags: action.tagsData };

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
        currentHomeDisplayArticle: action.tagRelatedArticles
      };

    case LOAD_INIT_ARTICLE_DETAIL:
      return { ...state, currentSlug: action.slug };

    case CURRENT_PROFILE_ARTICLE_LOADED:
      return { ...state, currentProfileDisplayArticle: action.userProfileData };

    case CURRENT_HOME_DISPLAY_ARTICLES_LOADED:
      return {
        ...state,
        currentHomeDisplayArticle: action.payload.articles,
        articleCount: action.payload.articlesCount
      };

    case DELETE_YOUR_ARTICLE_DONE:
      return { ...state, deleteYourArticleStatus: action.status };

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
