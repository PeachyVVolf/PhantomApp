import {
    CLEAR_ERRORS,
    CREATE_LOBBY_FAIL, CREATE_LOBBY_REQUEST,CREATE_LOBBY_SUCCESS,    
} from '../constants/adminConstants'

export const lobbyReducer = (state = { }, action) => {
    switch (action.type) {
        case CREATE_LOBBY_REQUEST:
            return {
                loading: true,
                created: false
            };
        case CREATE_LOBBY_SUCCESS:
            return {
                ...state,
                loading: false,
                created: true,
                lobby: action.payload
            };
        case CREATE_LOBBY_FAIL:
            return {
                ...state,
                loading: false,
                created: false,
                lobby: null,
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