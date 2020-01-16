export const INITIALDATA_LOADED = Symbol('INITIALDATA_LOADED');
export const ARTICLE_DATA_LOADED = Symbol('ARTICLE_DATA_LOADED')

export const loadInitialData = () => {
    return { type: INITIALDATA_LOADED };
};

export const articleDataLoaded = (articleInitData) =>{
    return { type: ARTICLE_DATA_LOADED, articleInitData};
}

