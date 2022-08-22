import { userNameReducer, userReducer } from "./reducers/userReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        userDetails: userReducer,
        userNameEdit: userNameReducer,
    }
});

export default store;