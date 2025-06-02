// store/slicers/apiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/config";

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async (customParams = {}) => {
    const defaultParams = {
      api_key: import.meta.env.VITE_APP_API_KEY,
      region: "EG",
      with_original_language: "ar",
      "primary_release_date.gte": "2020-01-01",
      "primary_release_date.lte": "2025-12-31",
    };

    // Fetch the first page to get total pages
    const firstResponse = await axiosInstance.get("/discover/movie", {
      params: { ...defaultParams, ...customParams, page: 1 },
    });

    const totalPages = Math.min(firstResponse.data.total_pages, 5); // limit to 5 pages for performance
    const allResults = [...firstResponse.data.results];

    // Fetch remaining pages
    const pagePromises = [];
    for (let page = 2; page <= totalPages; page++) {
      pagePromises.push(
        axiosInstance.get("/discover/movie", {
          params: { ...defaultParams, ...customParams, page },
        })
      );
    }

    const responses = await Promise.all(pagePromises);
    responses.forEach(res => {
      allResults.push(...res.data.results);
    });

    return allResults;
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
