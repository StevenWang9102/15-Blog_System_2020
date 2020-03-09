import {
  UPDATED_YOUR_SETTING,
  SET_LOADING_LOADED,
  SET_HOME_NAV_STATUS,
  POSTED_ARTICLE_RELOADED,
  EDIT_ARTICLE_BUTTON_CLICKED,
  SET_PROFILE_NAV,
  EMPTY_ARTICLE_COUNT,
} from "../Actions/eventActions";

import { SIGN_UP_USER_LOADED } from "../Actions/userActions";

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

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOME_NAV_STATUS:
      return {
        ...state,
        yourNav: action.your,
        favoriteNav: action.favorite,
        popularNav: action.popular
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


    case SIGN_UP_USER_LOADED:
      return { ...state, signUpStatus: action.data };

    case SET_LOADING_LOADED:
      return { ...state, loading: action.status };

    case EMPTY_ARTICLE_COUNT:
      return { ...state, articleCount: 0 };

    default:
      return state;
  }
};
