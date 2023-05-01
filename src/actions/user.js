import * as api from '../api';
import { LOGIN, RESTORE_ACCOUNT, RESTORE_PASSWORD, SIGNUP, UPDATE_USER } from '../constants';

export const login = (formData) => async (dispatch) => {
    try {
        const data = await api.login(formData);
        dispatch({type: LOGIN, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData) => async (dispatch) => {
    try {
        const data = await api.signup(formData);
        dispatch({type: SIGNUP, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const restoreAccount = (email) => async (dispatch) => {
    try {
        const data = await api.restoreAccount(email);
        dispatch({type: RESTORE_ACCOUNT, payload: data});
    } catch (error) {
        console.log(error);
    }
}
export const restorePassword = (formData, email, token, expires) => async (dispatch) => {
    try {
        const data = await api.restorePassword(formData, email, token, expires);
        dispatch({type: RESTORE_PASSWORD, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateUserInfo = (formData) => async (dispatch) => {
    try {
        const data = await api.updateUserInfo(formData);
        dispatch({type: UPDATE_USER, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateUserPass = (formData) => async (dispatch) => {
    try {
        const data = await api.updateUserPassword(formData);
        dispatch({type: UPDATE_USER, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateUserAvatar = (image) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append("avatar", image);
        const data = await api.updateUserAvatar(formData);
        dispatch({type: UPDATE_USER, payload: data});
    } catch (error) {
        console.log(error);
    }
}