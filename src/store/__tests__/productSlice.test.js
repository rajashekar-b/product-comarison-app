import productReducer, {
  fetchProducts,
  toggleSelectProduct,
  setShowComparison,
  setSortBy,
  resetSelectedProducts,
} from '../productSlice';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('axios');

describe('productSlice', () => {
  let store;

  beforeEach(() => {
      store = configureStore({ reducer: { products: productReducer } });
  });

  it('should handle initial state', () => {
      expect(productReducer(undefined, { type: 'unknown' })).toEqual({
          items: [],
          loading: false,
          error: null,
          selectedProductIds: [],
          showComparison: false,
          sortBy: null,
      });
  });

  it('should set loading to true when fetchProducts is pending', () => {
      const nextState = productReducer(undefined, { type: fetchProducts.pending.type });
      expect(nextState.loading).toBe(true);
  });

  it('should set items and loading to false when fetchProducts is fulfilled', async () => {
      const mockResponse = { data: [{ id: 1, title: 'Test Product' }] };
      axios.get.mockResolvedValue(mockResponse);

      await store.dispatch(fetchProducts());
      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.items).toEqual([{ id: 1, title: 'Test Product' }]);
  });

  it('should set error and loading to false when fetchProducts is rejected', async () => {
      axios.get.mockRejectedValue(new Error('Failed'));

      await store.dispatch(fetchProducts());
      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual('Failed');
  });

  it('should toggle product selection', () => {
      let state = productReducer(undefined, toggleSelectProduct(1));
      expect(state.selectedProductIds).toEqual([1]);

      state = productReducer(state, toggleSelectProduct(1));
      expect(state.selectedProductIds).toEqual([]);

      state = productReducer(state, toggleSelectProduct(2));
      expect(state.selectedProductIds).toEqual([2]);

      state = productReducer({ ...state, selectedProductIds: [1, 2] }, toggleSelectProduct(3));
      expect(state.selectedProductIds).toEqual([1, 2, 3]);

      state = productReducer({ ...state, selectedProductIds: [1, 2, 3] }, toggleSelectProduct(1));
      expect(state.selectedProductIds).toEqual([2, 3]);
  });

  it('should set showComparison to true', () => {
      const nextState = productReducer(undefined, setShowComparison());
      expect(nextState.showComparison).toBe(true);
  });

  it('should set sortBy', () => {
      let state = productReducer(undefined, setSortBy('price'));
      expect(state.sortBy).toBe('price');

      state = productReducer(state, setSortBy('rating'));
      expect(state.sortBy).toBe('rating');

      state = productReducer(state, setSortBy(null));
      expect(state.sortBy).toBe(null);
  });

  it('should reset selected products and hide comparison', () => {
      const initialState = {
          items: [],
          loading: false,
          error: null,
          selectedProductIds: [1, 2, 3],
          showComparison: true,
          sortBy: null,
      };
      const nextState = productReducer(initialState, resetSelectedProducts());
      expect(nextState.selectedProductIds).toEqual([]);
      expect(nextState.showComparison).toBe(false);
  });
});