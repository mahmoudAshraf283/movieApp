import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slicers/apiSlicer";

export const store = configureStore({
    reducer: {
        api: apiReducer
    }
})