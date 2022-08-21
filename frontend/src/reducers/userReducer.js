import { REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, CLEAR_ERRORS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from '../constants/userConstants'

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case USER_DETAILS_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };
        case REGISTER_SUCCESS:
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case REGISTER_FAIL:
        case USER_DETAILS_FAIL:
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