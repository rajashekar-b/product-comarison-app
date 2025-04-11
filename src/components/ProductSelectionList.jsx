import React from 'react';
import ProductCard from './ProductCard';

const ProductSelectionList = ({ products, selectedProductIds, onToggleSelect }) => {
  const isSelectionFull = selectedProductIds.length >= 3;

  return (
    <div>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selectedProductIds.includes(product.id)}
          onToggleSelect={onToggleSelect}
          disabled={isSelectionFull && !selectedProductIds.includes(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductSelectionList;