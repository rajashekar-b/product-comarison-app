import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedProductIds: [],
    showComparison: false,
    sortBy: null,
  },
  reducers: {
    toggleSelectProduct: (state, action) => {
      const productId = action.payload;
      if (state.selectedProductIds.includes(productId)) {
        state.selectedProductIds = state.selectedProductIds.filter(id => id !== productId);
      } else {
        if (state.selectedProductIds.length < 3) { // Limit to 3 products
          state.selectedProductIds.push(productId);
        }
      }
    },
    setShowComparison: (state) => {
      state.showComparison = true;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetSelectedProducts: (state) => {
      state.selectedProductIds = [];
      state.showComparison = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleSelectProduct, setShowComparison, resetSelectedProducts, setSortBy } = productSlice.actions;
export default productSlice.reducer;