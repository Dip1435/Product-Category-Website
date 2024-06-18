import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const token = localStorage.getItem("token")

// fetching categories...
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await api.get('/categories/list', {
    headers: {
      Authorization : token,
    }
  }).catch((error) => <Navigate to="dashboard/home" />);
  return response.data.data;
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
    category_id : ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
        state.category_id = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
