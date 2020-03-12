import {
  LOAD_YOUR_FEED,
  LOAD_GLOBAL_FEEDS,
  SIGN_UP_USER_LOADED,
  ARTICLE_DATA_LOADED,
  UPDATED_YOUR_SETTING,
  SET_LOADING_LOADED,
  DELETE_YOUR_ARTICLE_DONE,
  POPULAR_TAG_CLICKED,
  SET_HOME_NAV_STATUS,
  POSTED_ARTICLE_RELOADED,
  EDIT_ARTICLE_BUTTON_CLICKED,
  SET_PROFILE_NAV,
  EMPTY_ARTICLE_COUNT
} from "./loadActions";

const initialState = {
  article_loaded: false,
  yourNav: "active",
  favoriteNav: "null",
  settingStatus: "NOT UPDATED",
  popularNav: "null",
  profileNavStatusLeft: "active",
  profileNavStatusRight: "null",
  loading: "nothing"
};

export const syncReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_YOUR_FEED:
      return { ...state, currentTagName: null };

    case LOAD_GLOBAL_FEEDS:
      return { ...state, currentTagName: "" };

    case SET_HOME_NAV_STATUS:
      return {
        ...state,
        yourNav: action.your,
        favoriteNav: action.favorite,
        popularNav: action.popular,
      };

    case POSTED_ARTICLE_RELOADED:
      return { ...state, article_loaded: action.status };

    case EDIT_ARTICLE_BUTTON_CLICKED:
      return { ...state, article_loaded: action.status };

    case SET_PROFILE_NAV:
      return {
        ...state,
        profileNavStatusLeft: action.profileNavStatusLeft,
        profileNavStatusRight: action.profileNavStatusRight
      };

    case UPDATED_YOUR_SETTING:
      return { ...state, settingStatus: action.status };

    case DELETE_YOUR_ARTICLE_DONE:
      return { ...state, deleteYourArticleStatus: action.status };

    case SIGN_UP_USER_LOADED:
      return { ...state, signUpStatus: action.data };

    // POPULAR_TAG_CLICKED
    case POPULAR_TAG_CLICKED:
      return { ...state, currentTagName: action.tagName };

    // SET_LOADING_LOADED
    case SET_LOADING_LOADED:
      return { ...state, loading: action.status };

    // ARTICLE_DATA_LOADED
    case ARTICLE_DATA_LOADED:
      return { ...state, loading: action.loading };
    
    // EMPTY_ARTICLE_COUNT
    case EMPTY_ARTICLE_COUNT:
      return { ...state, articleCount: 0 };  

    default:
      return state;
  }
};
