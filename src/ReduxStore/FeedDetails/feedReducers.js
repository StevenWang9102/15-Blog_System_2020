import {
    ARTICLE_DATA_LOADED
} from "./feedActions";

const initialState = {
    // 目前没有
};

export const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case ARTICLE_DATA_LOADED:
            return { ...state, articleLibrary: action.articleData };        
        default:
            return state;
    }
};
