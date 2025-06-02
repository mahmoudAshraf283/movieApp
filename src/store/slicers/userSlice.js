import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const { username, email, password } = action.payload;

      // Check if user already exists
      if (users.some(user => user.email === email)) {
        throw new Error('Email already registered');
      }

      // Add new user
      const newUser = { username, email, password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Set current user
      state.user = { username, email };
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify({ username, email }));
    },
    login: (state, action) => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const { email, password } = action.payload;

      // Find user
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Set current user
      state.user = { username: user.username, email: user.email };
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify({ username: user.username, email: user.email }));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
  },
});

export const { register, login, logout } = userSlice.actions;
export default userSlice.reducer; 