import {
  ARTICLE_DATA_LOADED,
  TAGS_DATA_LOADED,
  ARTICLE_TITLE_CLICKED,
  ARTICLE_COMMENTS_LOADED,
  ARTICLE_CONTENT_LOADED,
  TAG_RELATED_ARTICLE_LOADED,
  RELATED_TAG_LOADED,
  USERS_PROFILE_LOADED,
  GLOBLE_FEED_CLICKED,
  USERS_RELATED_ARTICLES_LOADED,
  FAVERATED_ARITICLE_LOADED,
  USER_TOKEN_LOADED,
  // SIGN_IN_BUTTON_CLICKED,
  // USER_TOKEN_NAME_LOADED,
} from "./feedActions";

const initialState = {
  currentComments: {},
  currentArticleDetails: {},
  articleLibrary: [],
  popularTags: [],
  currentArticleTitle: "",
  currentArticleSlug: "",
  currentProfileData: {},
  currentUsersArticles: [],
  favoritedArticles: [],
  tagRelatedArticles: null,
  currentTagName:"",
  userToken: null
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

    case GLOBLE_FEED_CLICKED:
      return { ...state, currentTagName: "", tagRelatedArticles: null };

    case USERS_PROFILE_LOADED:
      return { ...state, currentProfileData: action.userProfileData };

    case USERS_RELATED_ARTICLES_LOADED:
      return { ...state, currentUsersArticles: action.userRelatedArticles };
      
    case FAVERATED_ARITICLE_LOADED:
      return { ...state, favoritedArticles: action.favoritedArticles };

    case USER_TOKEN_LOADED:
      return { ...state, userToken: action.userToken, userTokenName: action.userTokenName  };

    // USER_TOKEN_NAME_LOADED
    // case USER_TOKEN_NAME_LOADED:
    //   return { ...state, userTokenName: action.userTokenName };

    // 测试 
  
    default:
      return state;
  }
};
