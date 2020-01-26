import {
  ARTICLE_DATA_LOADED,
  TAGS_DATA_LOADED,
  ARTICLE_TITLE_CLICKED,
  POPULAR_TAG_DISPLAYED,
  ARTICLE_COMMENTS_LOADED,
  ARTICLE_CONTENT_LOADED,
  TAG_RELATED_ARTICLE_LOADED,
  RELATED_TAG_LOADED,
  GLOBLE_FEED_CLICKED
} from "./feedActions";

const initialState = {
  currentComments: {},
  currentArticleDetails: {},
  articleLibrary: [],
  popularTags: [],
  currentArticleTitle: "",
  currentArticleSlug: ""
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

    case POPULAR_TAG_DISPLAYED:
      return { ...state, isDisplay: action.tagName };

    case RELATED_TAG_LOADED:
      return { ...state, currentTagName: action.tagName };
    // GLOBLE_FEED_CLICKED
    case GLOBLE_FEED_CLICKED:
      return { ...state, currentTagName: "", tagRelatedArticles: []};
    default:
      return state;
  }
};
