import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slicers/apiSlicer";
import watchlistReducer from "./slicers/watchlistSlice";
import userReducer from "./slicers/userSlice";

export const store = configureStore({
    reducer: {
        api: apiReducer,
        watchlist: watchlistReducer,
        user: userReducer
    }
})