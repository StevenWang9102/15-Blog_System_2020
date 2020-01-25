export const INITIALDATA_LOADED = Symbol('INITIALDATA_LOADED');
export const ARTICLE_DATA_LOADED = Symbol('ARTICLE_DATA_LOADED')
export const TAGS_DATA_LOADED = Symbol('TAGS_DATA_LOADED')
export const ARTICLE_TITLE_CLICKED = Symbol('ARTICLE_TITLE_CLICKED')
export const INIT_ARTICLE_COMMENT_GET = Symbol('INIT_ARTICLE_COMMENT_GET')
export const ARTICLE_COMMENTS_LOADED = Symbol('ARTICLE_COMMENTS_LOADED')
export const ARTICLE_CONTENT_LOADED = Symbol('ARTICLE_CONTENT_LOADED')

// onArticleDetailLoad

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

