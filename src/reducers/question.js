import { ANSWER_QUESTIONS, CLEAR_QUESTION_STATE, CREATE_QUESTION, DISLIKE_ANSWER, FETCH_QUESTION, FETCH_QUESTIONS, LIKE_ANSWER } from "../constants";

const questionReducers = (state = {questions: null, question: null, answer: null}, action) => {
    switch (action.type) {
        case CLEAR_QUESTION_STATE:
            return {...state, questions: null, question: null};
        case CREATE_QUESTION:
        case FETCH_QUESTIONS:
            return {...state, questions: action.payload.data};
        case FETCH_QUESTION:
            return {...state, question: action.payload.data};   
        case ANSWER_QUESTIONS:
            return {...state, question: action.payload.data}; 
        case LIKE_ANSWER:
        case DISLIKE_ANSWER:
            return {...state, answer: action.payload.data}; 
        default:
            return state;
    }
}

export default questionReducers;