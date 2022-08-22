import { 
    REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, 
    CLEAR_ERRORS, 
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
    USERNAME_EDIT_FAIL, USERNAME_EDIT_REQUEST, USERNAME_EDIT_SUCCESS,
 } from '../constants/userConstants'

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case USER_DETAILS_REQUEST:
        case USERNAME_EDIT_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };
        case REGISTER_SUCCESS:
        case USER_DETAILS_SUCCESS:
        case USERNAME_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case REGISTER_FAIL:
        case USER_DETAILS_FAIL:
        case USERNAME_EDIT_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const userNameReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USERNAME_EDIT_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };
        case USERNAME_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                message: action.payload.message
            };
        case USERNAME_EDIT_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};