import * as api from '../api';
import { CLEAR_POST_STATE, COMMENT_POST, CREATE_POST, DISLIKE_POST, FETCH_POST, FETCH_POSTS, LIKE_POST } from '../constants';

export const getPosts = (search) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_POST_STATE});
        const data = await api.getPosts(search);
        dispatch({type: FETCH_POSTS, payload: data});
    } catch (error) {
        console.log(error);
    }    
}
export const getUserPosts = () => async (dispatch) => {
    try {
        dispatch({type: CLEAR_POST_STATE});
        const data = await api.getUserPosts();
        dispatch({type: FETCH_POSTS, payload: data});
    } catch (error) {
        console.log(error);
    }    

}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_POST_STATE});
        const data = await api.getPost(id);
        dispatch({type: FETCH_POST, payload: data});
    } catch (error) { 
        console.log(error);
    }    
}

export const likePost = (id) => async (dispatch) => {
    try {
        const data = await api.likePost(id);
        dispatch({type: LIKE_POST, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const dislikePost = (id) => async (dispatch) => {
    try {
        const data = await api.dislikePost(id);
        dispatch({type: DISLIKE_POST, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (id, comment) => async (dispatch) => {
    try {
        const data = await api.commentPost(id, comment);
        dispatch({type: COMMENT_POST, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (formData) => async (dispatch) => {
    try {
        const data = await api.createPost(formData);
        dispatch({type: CREATE_POST, payload: data});
    } catch (error) {
        console.log(error);
    }
}