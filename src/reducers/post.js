import { CLEAR_POST_STATE, COMMENT_POST, DISLIKE_POST, FETCH_POST, FETCH_POSTS, LIKE_POST } from "../constants";

const postReducers = (state = {posts: null, post: null}, action) => {
    switch (action.type) {
        case CLEAR_POST_STATE:
            return {...state, post: null, posts: null}
        case FETCH_POSTS:
            return {...state, posts: action.payload.data};
        case FETCH_POST:
            return {...state, post: action.payload.data};
        case DISLIKE_POST:
        case COMMENT_POST:
        case LIKE_POST: 
            return {...state, post: action.payload?.data};
        default:
            return state;
    }
};

export default postReducers;