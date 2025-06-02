import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadState = (userEmail) => {
  try {
    const key = userEmail ? `watchlist_${userEmail}` : 'watchlist_guest';
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return {
        movies: [],
        tvShows: []
      };
    }
    return JSON.parse(serializedState);
  } catch {
    console.error('Error loading watchlist from localStorage');
    return {
      movies: [],
      tvShows: []
    };
  }
};

// Save state to localStorage
const saveState = (state, userEmail) => {
  try {
    const key = userEmail ? `watchlist_${userEmail}` : 'watchlist_guest';
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch {
    console.error('Error saving watchlist to localStorage');
  }
};

// Get current user from localStorage
const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const currentUser = getCurrentUser();
const initialState = loadState(currentUser?.email);

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action) => {
      const { item, type } = action.payload;
      if (type === 'movie') {
        if (!state.movies.some(movie => movie.id === item.id)) {
          state.movies.push(item);
        }
      } else if (type === 'tv') {
        if (!state.tvShows.some(show => show.id === item.id)) {
          state.tvShows.push(item);
        }
      }
      const currentUser = getCurrentUser();
      saveState({ movies: state.movies, tvShows: state.tvShows }, currentUser?.email);
    },
    removeFromWatchlist: (state, action) => {
      const { id, type } = action.payload;
      if (type === 'movie') {
        state.movies = state.movies.filter(movie => movie.id !== id);
      } else if (type === 'tv') {
        state.tvShows = state.tvShows.filter(show => show.id !== id);
      }
      const currentUser = getCurrentUser();
      saveState({ movies: state.movies, tvShows: state.tvShows }, currentUser?.email);
    },
    clearWatchlist: (state) => {
      state.movies = [];
      state.tvShows = [];
      const currentUser = getCurrentUser();
      saveState({ movies: [], tvShows: [] }, currentUser?.email);
    },
    loadUserWatchlist: (state, action) => {
      const userEmail = action.payload;
      const userWatchlist = loadState(userEmail);
      state.movies = userWatchlist.movies;
      state.tvShows = userWatchlist.tvShows;
    }
  }
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist, loadUserWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;