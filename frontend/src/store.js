import { userReducer } from "./reducers/userReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        userDetails: userReducer,
    }
});

export default store;