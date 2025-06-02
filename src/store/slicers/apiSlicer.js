import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/config";

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async ({ type = "movie", customParams = {} }) => {
    const defaultParams = {
      api_key: import.meta.env.VITE_APP_API_KEY,
      region: "EG",
      with_original_language: "ar",
      "primary_release_date.gte": "2020-01-01",
      "primary_release_date.lte": "2025-12-31",
    };

    // If there's a search query, use the search endpoint
    if (customParams.query) {
      // Format the query for exact match
      const formattedQuery = customParams.query.trim();
      
      const response = await axiosInstance.get("/search/movie", {
        params: {
          ...defaultParams,
          query: formattedQuery,
          // Add parameters for more precise matching
          include_adult: false,
          language: "en-US",
          page: 1,
        },
      });

      return response.data.results.filter((item) => {
        const title = (item.title || item.name || "").toLowerCase();
        const searchQuery = formattedQuery.toLowerCase();
        return (
          title === searchQuery ||
          title.startsWith(searchQuery) ||
          title.includes(searchQuery)
        );
      });
    }

    const response = await axiosInstance.get(`/discover/${type}`, {
      params: { ...defaultParams, ...customParams },
    });
    console.log(response.data.results);

    return response.data.results;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;

//to use in components
// import {  useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchData } from "./store/slicers/apiSlicer";

//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.api.data);
//   const loading = useSelector((state) => state.api.loading);
//   const error = useSelector((state) => state.api.error);
//   useEffect(() => {
//     dispatch(fetchData());
//   }, [dispatch]);
