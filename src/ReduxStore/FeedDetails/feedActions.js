export const INITIALDATA_LOADED = Symbol("INITIALDATA_LOADED");
export const ARTICLE_DATA_LOADED = Symbol("ARTICLE_DATA_LOADED")
export const TAGS_DATA_LOADED = Symbol("TAGS_DATA_LOADED")
export const ARTICLE_TITLE_CLICKED = Symbol("ARTICLE_TITLE_CLICKED")
export const INIT_ARTICLE_COMMENT_GET = Symbol("INIT_ARTICLE_COMMENT_GET")
export const ARTICLE_COMMENTS_LOADED = Symbol("ARTICLE_COMMENTS_LOADED")
export const ARTICLE_CONTENT_LOADED = Symbol("ARTICLE_CONTENT_LOADED")
export const POPULAR_TAG_CLICKED = Symbol("POPULAR_TAG_CLICKED")
export const POPULAR_TAG_DISPLAYED = Symbol("POPULAR_TAG_DISPLAYED")
export const TAG_RELATED_ARTICLE_LOADED = Symbol("TAG_RELATED_ARTICLE_LOADED")
export const RELATED_TAG_LOADED = Symbol("RELATED_TAG_LOADED")
export const GLOBLE_FEED_CLICKED = Symbol("GLOBLE_FEED_CLICKED")


export const loadInitialData = () => {
    return { type: INITIALDATA_LOADED };
};

export const loadInitArticleDetail = (slug) =>{
    return { type: INIT_ARTICLE_COMMENT_GET, slug };
}

export const articleDataLoaded = (articleData) =>{
    return { type: ARTICLE_DATA_LOADED, articleData};
}

// 这个是特定文章的返回值
export const articleContentLoaded = (initArticleData) => {
    return { type: ARTICLE_CONTENT_LOADED, initArticleData};
}

export const tagsDataLoaded = (tagsData) =>{
    return { type: TAGS_DATA_LOADED, tagsData};
}

export const articleCommentsLoaded = (initCommentData) =>{
    return { type: ARTICLE_COMMENTS_LOADED, initCommentData};
}

export const articleTitleClicked = (title, slug) => {
    return { type: ARTICLE_TITLE_CLICKED, title, slug };
}

export const popularTagClicked = (tagName) => {
    return { type: POPULAR_TAG_CLICKED, tagName }; 
}

export const popularTagIsDiplayed = (tagName) => {
    return { type: POPULAR_TAG_DISPLAYED, tagName }; 
}

export const tagRelatedArticleLoaded = (tagRelatedArticles) => {
    return { type: TAG_RELATED_ARTICLE_LOADED, tagRelatedArticles };
}

export const globeFeedClicked = () => {
    return { type: GLOBLE_FEED_CLICKED };
}

export const relatedTagLoaded = (tagName) => {
    return { type: RELATED_TAG_LOADED, tagName };
}