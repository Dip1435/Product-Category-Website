import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import { toast } from 'react-toastify';

const token = localStorage.getItem("token")

// fetching products...
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await api.get('/products/list' , {
    headers: {
      Authorization: token
    }
  }).catch((error) => console.log(error));
  return response.data.data;
});

// post products..
export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  
  const response = await api.post('/products/add', product ,{
    headers:{
      Authorization: token,
      "Content-Type":"application/json",
    }
  }).catch((error) => console.log(error));
  return response.data.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.category_id = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });
  },
});

export default productSlice.reducer;
