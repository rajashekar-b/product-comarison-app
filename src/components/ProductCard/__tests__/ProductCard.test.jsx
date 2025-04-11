import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductCard from '../index';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  image: 'test.jpg',
  price: 20,
  category: 'Test Category',
};
jest.mock('next/image', () => {
  return function MockedImage(props) {
    const src = props.src.startsWith('/') ? props.src : `/${props.src}`;
    return <img {...props} src={src} alt={props.alt} />;
  };
});

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    const { getByText, getByAltText } = render(
      <ProductCard product={mockProduct} isSelected={false} onToggleSelect={() => { }} disabled={false} />
    );

    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('Test Category')).toBeInTheDocument();
    expect(getByText(/\$20/)).toBeInTheDocument();
    expect(getByAltText('Test Product')).toBeInTheDocument();
    
  });

  it('calls onToggleSelect when the button is clicked', () => {
    const onToggleSelect = jest.fn();
    const { getByText } = render(
      <ProductCard product={mockProduct} isSelected={false} onToggleSelect={onToggleSelect} disabled={false} />
    );

    fireEvent.click(getByText('Compare'));
    expect(onToggleSelect).toHaveBeenCalledWith(1);
  });

  it('displays "Remove" when isSelected is true', () => {
    const { getByText } = render(
      <ProductCard product={mockProduct} isSelected={true} onToggleSelect={() => { }} disabled={false} />
    );
    expect(getByText('Remove')).toBeInTheDocument();
  });

  it('disables the button when disabled is true', () => {
    const { getByRole } = render(
      <ProductCard product={mockProduct} isSelected={false} onToggleSelect={() => { }} disabled={true} />
    );
    expect(getByRole('button')).toBeDisabled();
  });
});