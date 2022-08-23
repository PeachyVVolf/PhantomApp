import { userNameReducer, userReducer } from "./reducers/userReducer";
import { configureStore } from "@reduxjs/toolkit";
import { lobbyReducer } from "./reducers/adminReducer";

const store = configureStore({
    reducer: {
        userDetails: userReducer,
        userNameEdit: userNameReducer,
        lobbyCreate: lobbyReducer,
    }
});

export default store;