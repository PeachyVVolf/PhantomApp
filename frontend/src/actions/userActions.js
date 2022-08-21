import axios from "axios";
import { REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, CLEAR_ERRORS, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL } from '../constants/userConstants'

// Register
export const register = (username) => async(dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" }};
        const { data } = await axios.post(`http://localhost:5000/api/register`, username, config);

        dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: "Error" });
    }
};

//Get User Details
export const getUserDetails = (username) => async(dispatch) => {
    try{
        dispatch({type: USER_DETAILS_REQUEST});

        const config = { headers: { "Content-Type": "application/json" }};
        const { data } = await axios.post(`http://localhost:5000/api/user`, username, config);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });

    }catch (error) {
        dispatch({ type:USER_DETAILS_FAIL, payload: error })
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};