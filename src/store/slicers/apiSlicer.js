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

    // If there's a search query, use the search endpoint
    if (customParams.query) {
      const formattedQuery = customParams.query.trim();

      const response = await axiosInstance.get("/search/movie", {
        params: {
          ...defaultParams,
          query: formattedQuery,
          include_adult: false,
          language: "en-US",
          page: 1,
        },
      });

      // Filter results for better match quality
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
    }

    // Otherwise, use discover endpoint (multiple pages)
    const firstResponse = await axiosInstance.get("/discover/movie", {
      params: { ...defaultParams, ...customParams, page: 1 },
    });

    const totalPages = Math.min(firstResponse.data.total_pages, 5); // limit to 5
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
    responses.forEach((res) => {
      allResults.push(...res.data.results);
    });

    return allResults;
  }
);
