import {
  ARTICLE_DATA_LOADED,
  TAGS_DATA_LOADED,
  LOG_OUT_BUTTON_CLICK,
  FOLLOW_AUTHOR_LOADED,
  ARTICLE_COMMENTS_LOADED,
  LOAD_INIT_ARTICLE_DETAIL,
  ARTICLE_CONTENT_LOADED,
  TAG_RELATED_ARTICLE_LOADED,
  ARTICLE_SETTING_DETAIL_LOADED,
  USERS_PROFILE_LOADED,
  USERS_RELATED_ARTICLES_LOADED,
  FAVERATED_ARITICLE_LOADED,
  USER_INFORMATION_LOADED,
  CURRENT_PROFILE_ARTICLE_LOADED,
  CURRENT_HOME_DISPLAY_ARTICLES_LOADED,
} from "./loadActions";

const initialState = {
  currentComments: {},
  currentArticleDetails: {},
  globalArticles: [],
  popularTags: [],
  currentProfileDetail: {},
  currentUsersArticles: [],
  favoritedArticles: null,
  tagRelatedArticles: null,
  currentTagName: " ",
  userInformation: {},
  currentProfileDisplayArticle: [],
  currentHomeDisplayArticle: [],
  followAuthorStatus: false,
};

export const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_DATA_LOADED:
      return {
        ...state,
        globalArticles: action.articleData["articles"],
        currentHomeDisplayArticle: action.articleData["articles"],
        articleCount: action.articleData["articlesCount"]
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

    case USERS_PROFILE_LOADED:
      return { ...state, currentProfileDetail: action.userProfileData };

    case USERS_RELATED_ARTICLES_LOADED:
      return {
        ...state,
        currentUsersArticles: action.userRelatedArticles.articles,
        currentProfileDisplayArticle: action.userRelatedArticles.articles,
        articleCount: action.userRelatedArticles.articlesCount
      };

    case FAVERATED_ARITICLE_LOADED:
      return { ...state, 
          favoritedArticles: action.favoritedArticles.articles,
          articleCount: action.favoritedArticles.articlesCount
         };

    case USER_INFORMATION_LOADED:
      return { ...state, userInformation: action.userInformation };

    case LOG_OUT_BUTTON_CLICK:
      return { 
        ...state, 
        userInformation:{}
      };

    case LOAD_INIT_ARTICLE_DETAIL:
      return { ...state, currentSlug: action.slug };

    case CURRENT_PROFILE_ARTICLE_LOADED:
      return { ...state, currentProfileDisplayArticle: action.userProfileData };

    case CURRENT_HOME_DISPLAY_ARTICLES_LOADED:
      return { ...state, 
        currentHomeDisplayArticle: action.payload.articles,
        articleCount: action.payload.articlesCount
      };

    case ARTICLE_SETTING_DETAIL_LOADED:
      return { ...state, articles_setting: action.data };
    
    case FOLLOW_AUTHOR_LOADED:
      return { ...state, followAuthorStatus: action.data };
      
    default:
      return state;
  }
};
