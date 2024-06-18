import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import api from '../../services/api';
import { toast } from 'react-toastify';

// here for initialValue of user i checked from localstorage if it gets token it decode token and set to the user
const initialState = {
  token: localStorage.getItem('token') || null,
  user: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null,
  status: 'idle',
  error: null,
};

// post login credentials
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await api.post('/users/login', credentials).catch((error) => toast.error("Invalid Login Credentials !!"))
  response.data.type === "success" && toast.success("Login Successfully")
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.data;
        state.user = jwtDecode(action.payload.data);
        localStorage.setItem('token', action.payload.data);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
