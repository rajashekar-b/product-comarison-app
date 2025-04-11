import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductComparisonView from '../ProductComparisonView';

const sampleProducts = [
  {
    id: 1,
    title: 'Fjallraven Backpack',
    price: 109.95,
    description: 'A great bag for everyday use.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 3.9,
      count: 120
    }
  },
  {
    id: 2,
    title: 'Casual Shirt',
    price: 89.95,
    description: 'Light and comfortable shirt.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    rating: {
      rate: 4.5,
      count: 99
    }
  }
];

describe('ProductComparisonView', () => {
  it('renders empty message when no products are selected', () => {
    render(<ProductComparisonView products={[]} />);
    expect(screen.getByText(/please select the products to compare/i)).toBeInTheDocument();
  });

  it('displays product titles in comparison table', () => {
    render(<ProductComparisonView products={sampleProducts} />);
    expect(screen.getByText(/fjallraven backpack/i)).toBeInTheDocument();
    expect(screen.getByText(/casual shirt/i)).toBeInTheDocument();
  });

  it('displays product prices and ratings', () => {
    render(<ProductComparisonView products={sampleProducts} />);
    expect(screen.getByText('$109.95')).toBeInTheDocument();
    expect(screen.getByText(/3.9 \(120 reviews\)/i)).toBeInTheDocument();
  });

  it('toggles highlight differences checkbox', () => {
    render(<ProductComparisonView products={sampleProducts} />);
    const toggle = screen.getByLabelText(/highlight differences/i);
    expect(toggle).not.toBeChecked();

    fireEvent.click(toggle);
    expect(toggle).toBeChecked();
  });

  it('highlights price and rating when differences are toggled', () => {
    render(<ProductComparisonView products={sampleProducts} />);
    const toggle = screen.getByLabelText(/highlight differences/i);

    fireEvent.click(toggle);

    const priceCells = screen.getAllByText(/\$\d+\.\d{2}/);
    const ratingCells = screen.getAllByText(/reviews\)/);
    
    priceCells.forEach(cell => {
      expect(cell).toHaveStyle({ backgroundColor: '#FFFFE0' });
    });

    ratingCells.forEach(cell => {
      expect(cell).toHaveStyle({ backgroundColor: '#FFFFE0' });
    });
  });

  it('renders grouped property accordions', () => {
    render(<ProductComparisonView products={sampleProducts} />);
    const descriptionHeaders = screen.getAllByText(/description/i);
    expect(descriptionHeaders.length).toBeGreaterThan(0);
    const categoryHeaders = screen.getAllByText(/category/i);
    expect(categoryHeaders.length).toBeGreaterThan(0);
  });
});
