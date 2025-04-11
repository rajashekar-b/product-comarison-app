/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '../page';
import { fetchProducts } from '@/store/productSlice';

// Mock the next/image module
jest.mock('next/image', () => {
  return function MockedImage(props) {
    const src = props.src.startsWith('/') ? props.src : `/${props.src}`;
    return <img {...props} src={src} alt={props.alt} />;
  };
});

const mockStore = configureStore([]);

describe('Home Page', () => {
  let store;

  const mockProducts = [
    { id: 1, title: 'Product 1', image: 'img1.jpg', price: 10, rating: { rate: 4.5, count: 100 } },
    { id: 2, title: 'Product 2', image: 'img2.jpg', price: 20, rating: { rate: 3.8, count: 50 } },
  ];

  beforeEach(() => {
    store = mockStore({
      products: {
        items: mockProducts,
        loading: false,
        error: null,
        selectedProductIds: [],
        showComparison: false,
        sortBy: null,
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });

  it('renders product cards', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText(/\$10/)).toBeInTheDocument();
    expect(screen.getByText(/\$20/)).toBeInTheDocument();
  });

  it('allows selecting products for comparison', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      const buttons = screen.getAllByText('Compare');
      fireEvent.click(buttons[0]);
      expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: 'products/toggleSelectProduct',
        payload: 1,
      }));
    });
  });

  it('resets the comparison when "Reset Comparison" is clicked', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      const buttons = screen.getAllByText('Compare');
      fireEvent.click(buttons[0]);
      fireEvent.click(buttons[1]);
    });

    setTimeout(() => {
      const compareButton = screen.getByText('Compare (2 / 3)');
      fireEvent.click(compareButton);
    }, 1000);

    setTimeout(() => {
      const resetButton = screen.getByText('Reset Comparison');
      fireEvent.click(resetButton);
    }, 1000);

    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: 'products/resetSelectedProducts',
      }));
    }, 100)
    
  });

  it('sorts products by price when "Price" is clicked', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      const sortButton = screen.getByText('Sort by: None');
      fireEvent.click(sortButton);
    });

    const priceOption = screen.getByText('Price');
    fireEvent.click(priceOption);

    expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'products/setSortBy',
      payload: 'price',
    }));
  });

  it('sorts products by rating when "Rating" is clicked', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      const sortButton = screen.getByText('Sort by: None');
      fireEvent.click(sortButton);
    });

    const ratingOption = screen.getByText('Rating');
    fireEvent.click(ratingOption);

    expect(store.dispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: 'products/setSortBy',
      payload: 'rating',
    }));
  });

  it('displays an error message when there is an error', async () => {
    store = mockStore({
      products: {
        items: [],
        loading: false,
        error: 'Failed to fetch products',
        selectedProductIds: [],
        showComparison: false,
        sortBy: null,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch products')).toBeInTheDocument();
    });
  });
});