import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slicers/apiSlicer";
import watchListReducer from "./slicers/watchlistSlice"
import userReducer from "./slicers/userSlice";

export const store = configureStore({
    reducer: {
        api: apiReducer,
        watchList: watchListReducer,
        user: userReducer
    }
})