import {
  LOAD_YOUR_FEED,
  LOAD_GLOBAL_FEEDS,
  SIGN_UP_USER_LOADED,
  UPDATED_YOUR_SETTING,
  DELETE_YOUR_ARTICLE_DONE,
  POPULAR_TAG_CLICKED,
  SET_HOME_NAV_STATUS,
  POSTED_ARTICLE_RELOADED,
  EDIT_ARTICLE_BUTTON_CLICKED,
  SET_PROFILE_NAV
} from "./feedActions";

const initialState = {  
  article_reloaded: false,
  yourNav: "active", 
  favoriteNav: "null",
  yourSettingStatus:"not updated",
  popularNav: "null",
  profileNavStatusLeft: "active",
  profileNavStatusRight: "null",
};

export const syncReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_YOUR_FEED:
      return { ...state, currentTagName: null, tagRelatedArticles: null };

    case LOAD_GLOBAL_FEEDS:
      return { ...state, currentTagName: "", tagRelatedArticles: null };

    case SET_HOME_NAV_STATUS:
      return {
        ...state,
        yourNav: action.your,
        favoriteNav: action.favorite,
        popularNav: action.popular,
      };

    case POSTED_ARTICLE_RELOADED:
      return { ...state, article_reloaded: action.status };

    case EDIT_ARTICLE_BUTTON_CLICKED:
      return { ...state, article_reloaded: action.status };

    case SET_PROFILE_NAV:
      return {
        ...state,
        profileNavStatusLeft: action.profileNavStatusLeft,
        profileNavStatusRight: action.profileNavStatusRight
      };

    case UPDATED_YOUR_SETTING:
      return { ...state, yourSettingStatus: action.status };

    case DELETE_YOUR_ARTICLE_DONE:
      return { ...state, deleteYourArticleStatus: action.status };

    case SIGN_UP_USER_LOADED:
      return { ...state, signUpStatus: action.data };

      // POPULAR_TAG_CLICKED
      case POPULAR_TAG_CLICKED:
        return { ...state, currentTagName: action.tagName };
  
    default:
      return state;
  }
};
