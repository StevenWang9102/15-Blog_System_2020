import {
  FOLLOW_AUTHOR_LOADED,
  LOG_OUT_BUTTON_CLICK,
  USERS_PROFILE_LOADED,
  // USERS_RELATED_ARTICLES_LOADED,
  USER_INFORMATION_LOADED
} from "../Actions/userActions";

const initialState = {
  currentProfileDetail: {},
  currentUsersArticles: [],
  userInformation: {},
  currentProfileDisplayArticle: [],
  followAuthorStatus: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case USERS_PROFILE_LOADED:
      return { ...state, currentProfileDetail: action.userProfileData };

    case USER_INFORMATION_LOADED:
      return { ...state, userInformation: action.userInformation };

    case LOG_OUT_BUTTON_CLICK:
      return {
        ...state,
        userInformation: {}
      };

    case FOLLOW_AUTHOR_LOADED:
      return { ...state, followAuthorStatus: action.data };

    default:
      return state;
  }
};
