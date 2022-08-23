import axios from "axios";
import { 
    REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, 
    CLEAR_ERRORS, 
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, 
    USERNAME_EDIT_REQUEST, USERNAME_EDIT_SUCCESS, USERNAME_EDIT_FAIL
} from '../constants/userConstants'

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

//Update Username
export const updateUsername = (username) => async(dispatch) => {
    try{
        dispatch({type: USERNAME_EDIT_REQUEST});

        const config = { headers: { "Content-Type": "application/json" }};
        const { data } = await axios.post(`http://localhost:5000/api/user/edit`, username, config);
        dispatch({ type: USERNAME_EDIT_SUCCESS, payload: data });

    }catch (error) {
        dispatch({ type:USERNAME_EDIT_FAIL, payload: error })
    }
}

//Update ProfilePic
export const updateProfile = (image) => async(dispatch) => {
    try{
        dispatch({type: USERNAME_EDIT_REQUEST});

        const config = { headers: { "Content-Type": "application/json" }};
        const { data } = await axios.post(`http://localhost:5000/api/user/editPic`, image, config);
        dispatch({ type: USERNAME_EDIT_SUCCESS, payload: data });

    }catch (error) {
        dispatch({ type:USERNAME_EDIT_FAIL, payload: error })
    }
}


// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};