import * as api from '../api';
import { ANSWER_QUESTIONS, CLEAR_QUESTION_STATE, CREATE_QUESTION, DISLIKE_ANSWER, FETCH_QUESTION, FETCH_QUESTIONS, LIKE_ANSWER } from '../constants';

export const getQuestions = () => async (dispatch) => {
    try {
        dispatch({type: CLEAR_QUESTION_STATE});
        const data = await api.getQuestions();
        dispatch({type: FETCH_QUESTIONS, payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const getUserQuestions = () => async (dispatch) => {
    try {
        dispatch({type: CLEAR_QUESTION_STATE});
        const data = await api.getUserQuestions();
        dispatch({type: FETCH_QUESTIONS, payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const getUserAnsweredQuestions = () => async (dispatch) => {
    try {
        dispatch({type: CLEAR_QUESTION_STATE});
        const data = await api.getUserAnsweredQuestions();
        dispatch({type: FETCH_QUESTIONS, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getQuestion = (id) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_QUESTION_STATE});
        const data = await api.getQuestion(id);
        dispatch({type: FETCH_QUESTION, payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const answerQuestion = (id, formData) => async (dispatch) => {
    try {
        const data = await api.answerQuestion(id, formData);
        dispatch({type: ANSWER_QUESTIONS, payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const likeAnswer = (id) => async (dispatch) => {
    try {
        const data = await api.likeAnswer(id);
        dispatch({type: LIKE_ANSWER, payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const dislikeAnswer = (id) => async (dispatch) => {
    try {
        const data = await api.dislikeAnswer(id);
        dispatch({type: DISLIKE_ANSWER, payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const createQuestion = (formData) => async (dispatch) => {
    try {
        const data = await api.createQuestion(formData);
        dispatch({type: CREATE_QUESTION, payload: data});
    } catch (error) {
        console.log(error);
    }
}