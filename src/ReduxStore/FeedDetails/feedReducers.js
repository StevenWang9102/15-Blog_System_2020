import { ARTICLE_DATA_LOADED, TAGS_DATA_LOADED } from "./feedActions";

const initialState = {
  // Blank for now
};

export const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_DATA_LOADED:
      return { ...state, articleLibrary: action.articleData };
    case TAGS_DATA_LOADED:
      return { ...state, popularTags: action.tagsData };
    default:
      return state;
  }
};
