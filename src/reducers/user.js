import { CLEAR_USER_STATUS, LOGIN, LOGOUT, RESTORE_ACCOUNT, RESTORE_PASSWORD, SIGNUP, UPDATE_USER } from "../constants";

const userReducers = (state = {authStatus: null, userUpdateStatus: null, resetStatus: null}, action) => {
    switch (action.type) {
        case CLEAR_USER_STATUS:
            return {...state, authStatus: null, userUpdateStatus: null, resetStatus: null};
        case LOGIN:
        case SIGNUP:
        case RESTORE_PASSWORD:
            if(!!action.payload && !!action.payload.data && action.payload.status === 200){
                localStorage.setItem('profile', JSON.stringify({...action.payload.data}));
            }
            return {...state, authStatus: action.payload?.status};
        case UPDATE_USER:
            if(!!action.payload && !!action.payload.data && action.payload.status === 200){
                localStorage.setItem('profile', JSON.stringify({...action.payload.data}));
            }
            return {...state, userUpdateStatus: action.payload?.status};
        case LOGOUT:
            localStorage.removeItem('profile');
            return {...state, authStatus: null};    
        case RESTORE_ACCOUNT:
            return {...state, resetStatus: null}
        default:
            return state;    
    }
};

export default userReducers;