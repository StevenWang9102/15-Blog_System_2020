import {
  ARTICLE_DATA_LOADED,
  TAGS_DATA_LOADED,
  ARTICLE_TITLE_CLICKED,
  ARTICLE_COMMENTS_LOADED
} from "./feedActions";

const initialState = {
  // Blank for now
  currentComments:{}
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
    //
    case ARTICLE_COMMENTS_LOADED:
      return { ...state, currentComments: action.initCommentData };

    default:
      return state;
  }
};
