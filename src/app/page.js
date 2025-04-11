'use client';

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, toggleSelectProduct, setShowComparison, resetSelectedProducts, setSortBy } from '@/store/productSlice';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import ProductSelectionList from '@/components/ProductSelectionList';
import ProductComparisonView from '@/components/ProductComparisonView';
import styles from './page.module.css';
import ProductCardPlaceholder from '@/components/ProductCard/ProductCardPlaceholder';
import SortDropdown from '@/components/SortDropdown';

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading, error, selectedProductIds, showComparison, sortBy } = useSelector(state => state.products);

  const comparisonTableRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleToggleSelect = (productId) => {
    dispatch(toggleSelectProduct(productId));
  };

  // Sort the products
  const sortedProducts = React.useMemo(() => {
    if (sortBy === 'price') {
      return [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      return [...items].sort((a, b) => b.rating.rate - a.rating.rate);
    }
    return items;
  }, [items, sortBy]);

  const handleShowComparison = () => {
    dispatch(setShowComparison());
    setTimeout(() => {
      if (comparisonTableRef.current) {
        comparisonTableRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100)
  };

  const handleSortByChange = (value) => {
    dispatch(setSortBy(value));
  };

  const handleResetComparison = () => {
    dispatch(resetSelectedProducts());
  };

  const selectedProducts = React.useMemo(
    () => items.filter(product => selectedProductIds.includes(product.id)),
    [items, selectedProductIds]
  );

  const placeholderCards = Array.from({ length: 8 }).map((_, index) => (
    <Col key={index} xs={12} sm={6} md={4} lg={3}>
      <ProductCardPlaceholder />
    </Col>
  ));

  if (loading) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Container className="mt-4 pb-5">
          <h1 className="text-center mb-4">Product Comparison</h1>
          <Row className="gy-2">{placeholderCards}</Row>
        </Container>
      </div>
    );
  }

  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Container className="mt-4 pb-5">
        <h1 className="text-center mb-4">Product Comparison</h1>
        {
          !loading
            &&
            <div style={{paddingBottom: '10px'}}>
              <SortDropdown sortBy={sortBy} onSortByChange={handleSortByChange} />
            </div>
        }
        
        <Row className="gy-2">
          {sortedProducts.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductSelectionList
                products={[product]}
                selectedProductIds={selectedProductIds}
                onToggleSelect={handleToggleSelect}
              />
            </Col>
          ))}
        </Row>

        {showComparison && (
          <div ref={comparisonTableRef}>
            <h2 className="mt-5">Compare Products</h2>
            <ProductComparisonView products={selectedProducts} />
            <div className="text-center mt-4">
              <Button variant="secondary" onClick={handleResetComparison}>
                Reset Comparison
              </Button>
            </div>
          </div>
        )}
      </Container>

      {selectedProductIds.length > 0 && !showComparison && (
        <div className={styles.compareFooter}>
          <Button variant="primary" onClick={handleShowComparison} disabled={selectedProductIds.length <= 1}>
            Compare ({selectedProductIds.length} / 3)
          </Button>
        </div>
      )}
    </div>
  );
}