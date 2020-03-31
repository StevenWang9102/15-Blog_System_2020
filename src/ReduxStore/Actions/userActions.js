export const SAVE_USER_INFOR_TO_STORE = Symbol("SAVE_USER_INFOR_TO_STORE");
export const SET_LOG_IN_STSTUS = Symbol("SET_LOG_IN_STSTUS");
export const LOG_OUT_BUTTON_CLICK = Symbol("LOG_OUT_BUTTON_CLICK");
export const SIGN_UP_BUTTON_CLICK = Symbol("SIGN_UP_BUTTON_CLICK");
export const SIGN_UP_USER_LOADED = Symbol("SIGN_UP_USER_LOADED");
export const FOLLOW_AUTHOR_LOADED = Symbol("FOLLOW_AUTHOR_LOADED");
export const LOADED_USER_PROFILE = Symbol("LOADED_USER_PROFILE");
export const USERS_PROFILE_LOADED = Symbol("USERS_PROFILE_LOADED");
export const USERS_RELATED_ARTICLES_LOADED = Symbol(
  "USERS_RELATED_ARTICLES_LOADED"
);
export const SIGN_IN_BUTTON_CLICKED = Symbol("SIGN_IN_BUTTON_CLICKED");
export const USER_INFORMATION_LOADED = Symbol("USER_INFORMATION_LOADED");

// --------------------------- Functions --------------------------------
export const saveUserInformationToStore = userInformation => {
  return { type: SAVE_USER_INFOR_TO_STORE, userInformation: userInformation };
};

export const logOutButtonClicked = () => {
  return { type: LOG_OUT_BUTTON_CLICK };
};

export const onSignUpButtonClicked = (userName, email, password) => {
  return {
    type: SIGN_UP_BUTTON_CLICK,
    userName: userName,
    email: email,
    password: password
  };
};

export const setSignUpStatus = data => {
  return { type: SIGN_UP_USER_LOADED, data: data };
};

export const followAuthorLoaded = data => {
  return { type: FOLLOW_AUTHOR_LOADED, data: data };
};

export const loadUserProfileDetail = (
  author_name,
  displayLimit,
  offset
) => {
  return {
    type: LOADED_USER_PROFILE,
    author_name,
    displayLimit,
    offset
  };
};

export const userProfileDataLoaded = userProfileData => {
  return { type: USERS_PROFILE_LOADED, userProfileData };
};

export const signInClicked = (email, password) => {
  return { type: SIGN_IN_BUTTON_CLICKED, email: email, password: password };
};

export const userInformationLoaded = payload => {
  return { type: USER_INFORMATION_LOADED, userInformation: payload.user };
};
