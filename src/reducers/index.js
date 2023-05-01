import { combineReducers } from "redux";
import global from './global';
import post from './post';
import user from './user';
import question from './question';

export default combineReducers({
    global, post, user, question,
});