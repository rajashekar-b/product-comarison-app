import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductSelectionList from '../ProductSelectionList';

const mockProducts = [
  { id: 1, title: 'Product 1', image: 'img1.jpg', price: 10 },
  { id: 2, title: 'Product 2', image: 'img2.jpg', price: 20 },
];

jest.mock('next/image', () => {
  return function MockedImage(props) {
    const src = props.src.startsWith('/') ? props.src : `/${props.src}`;
    return <img {...props} src={src} alt={props.alt} />;
  };
});

describe('ProductSelectionList', () => {
  it('renders a list of ProductCards', () => {
    const { getByText, getByAltText } = render(
      <ProductSelectionList products={mockProducts} selectedProductIds={[]} onToggleSelect={() => { }} />
    );

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText(/\$10/)).toBeInTheDocument();
    expect(getByAltText('Product 1')).toBeInTheDocument();

    expect(getByText('Product 2')).toBeInTheDocument();
    expect(getByText(/\$20/)).toBeInTheDocument();
    expect(getByAltText('Product 2')).toBeInTheDocument();
  });

  it('calls onToggleSelect with the correct id when a card button is clicked', () => {
    const onToggleSelect = jest.fn();
    const { getAllByText } = render(
      <ProductSelectionList products={mockProducts} selectedProductIds={[]} onToggleSelect={onToggleSelect} />
    );

    fireEvent.click(getAllByText('Compare')[0]);
    expect(onToggleSelect).toHaveBeenCalledWith(1);

    fireEvent.click(getAllByText('Compare')[1]);
    expect(onToggleSelect).toHaveBeenCalledWith(2);
  });

  it('disables remaining ProductCards based on selectedProductIds', () => {
    const comparedProducts = [
      { id: 1, title: 'Product 1', image: 'img1.jpg', price: 10 },
      { id: 2, title: 'Product 2', image: 'img2.jpg', price: 20 },
      { id: 3, title: 'Product 3', image: 'img3.jpg', price: 30 },
      { id: 4, title: 'Product 4', image: 'img4.jpg', price: 50 },
    ];
    const { getAllByRole } = render(
      <ProductSelectionList products={comparedProducts} selectedProductIds={[1, 2, 3]} onToggleSelect={() => { }} />
    );
    expect(getAllByRole('button')[3]).toBeDisabled();
  });
});