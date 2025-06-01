import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slicers/apiSlicer";
import watchListReducer from "./slicers/watchlistSlice"

export const store = configureStore({
    reducer: {
        api: apiReducer,
        watchList: watchListReducer
    }
})