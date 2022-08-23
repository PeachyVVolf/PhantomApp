import axios from "axios";
import {
    CLEAR_ERRORS,
    CREATE_LOBBY_FAIL, CREATE_LOBBY_REQUEST, CREATE_LOBBY_SUCCESS,
} from '../constants/adminConstants'

// Create Lobby
export const createLobby = (lobbyData) => async(dispatch) => {
    try {
        dispatch({ type: CREATE_LOBBY_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } }
        const {data} = await axios.post(`http://localhost:5000/api/admin/createLobby`, lobbyData, config);

        dispatch({ type: CREATE_LOBBY_SUCCESS, payload: data.lobby })
    } catch (error) {
        dispatch({ type: CREATE_LOBBY_FAIL, payload: "Error" })
    }
}

//Join Lobbies
export const getLobbies = (userData) => async(dispatch) => {
    try {
        dispatch({ type: CREATE_LOBBY_REQUEST });
        const userInfo = {
            "walletAddress": userData.walletAddress
        }
        const config = { headers: { "Content-Type": "application/json" } }
        const {data} = await axios.post(`http://localhost:5000/api/lobby/${userData.lobbyID}`, userInfo, config);

        dispatch({ type: CREATE_LOBBY_SUCCESS, payload: data.lobby })
    } catch (error) {
        dispatch({ type: CREATE_LOBBY_FAIL, payload: "Error" })
    }
}