import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/config";

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async ({ type = "movie", customParams = {} }) => {
    const defaultParams = {
      api_key: import.meta.env.VITE_APP_API_KEY,
      region: "EG",
      with_original_language: "ar",
      language: customParams.language || "en-US",
      "primary_release_date.gte": "2020-01-01",
      "primary_release_date.lte": "2025-12-31",
    };

    if (customParams.query) {
      const formattedQuery = customParams.query.trim();
      
      try {
        const response = await axiosInstance.get("/search/movie", {
          params: {
            ...defaultParams,
            query: formattedQuery,
            include_adult: false,
            page: 1,
          },
        });

        const results = response.data.results.filter((movie) => {
          const title = movie.title.toLowerCase();
          const query = formattedQuery.toLowerCase();
          return (
            title === query ||
            title.startsWith(query) ||
            title.includes(query)
          );
        });

        return results;
      } catch (error) {
        console.error("Search error:", error);
        throw error;
      }
    }

    try {
      const firstResponse = await axiosInstance.get(`/discover/${type}`, {
        params: { ...defaultParams, ...customParams, page: 1 },
      });

      const totalPages = Math.min(firstResponse.data.total_pages, 5);
      const allResults = [...firstResponse.data.results];

      const pagePromises = [];
      for (let page = 2; page <= totalPages; page++) {
        pagePromises.push(
          axiosInstance.get(`/discover/${type}`, {
            params: { ...defaultParams, ...customParams, page },
          })
        );
      }

      const responses = await Promise.all(pagePromises);
      responses.forEach((res) => {
        allResults.push(...res.data.results);
      });

      return allResults;
    } catch (error) {
      console.error("Discover error:", error);
      throw error;
    }
  }
);

// ✅ THIS MUST BE DEFINED
const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSearch: (state) => {
      state.data = [];
      state.error = null;
    },
  },
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

export const { clearSearch } = apiSlice.actions;
export default apiSlice.reducer;
