export const INITIALDATA_LOADED = Symbol('INITIALDATA_LOADED');
export const ARTICLE_DATA_LOADED = Symbol('ARTICLE_DATA_LOADED')
export const TAGS_DATA_LOADED = Symbol('TAGS_DATA_LOADED')
export const ARTICLE_TITLE_CLICKED = Symbol('ARTICLE_TITLE_CLICKED')


export const loadInitialData = () => {
    return { type: INITIALDATA_LOADED };
};

export const articleDataLoaded = (articleData) =>{
    return { type: ARTICLE_DATA_LOADED, articleData};
}

export const tagsDataLoaded = (tagsData) =>{
    return { type: TAGS_DATA_LOADED, tagsData};
}

export const articleTitleClicked = (title, slug) => {
    return { type: ARTICLE_TITLE_CLICKED, title, slug };
}

