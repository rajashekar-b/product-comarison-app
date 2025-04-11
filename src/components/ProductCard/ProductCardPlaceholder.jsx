import React from 'react';
import { Card, Placeholder, Button } from 'react-bootstrap';
import styles from './ProductCard.module.css';

const ProductCardPlaceholder = () => {
  return (
    <Card className={`${styles.productCard} mb-4`}>
      <div className={styles.imageContainer} role='img'>
        <Placeholder animation="glow" style={{ width: '100%', height: '100%' }} />
      </div>
      <Card.Body>
        <Placeholder animation="glow" as="h5" className="mb-2" style={{ width: '75%' }} />
        <Placeholder animation="glow" as="p" className="mb-1" style={{ width: '50%' }} />
        <Placeholder animation="glow" as="p" style={{ width: '30%' }} />
        {/* <Placeholder animation="glow" as={Button} variant="primary" style={{ width: '60%' }} /> */}
      </Card.Body>
    </Card>
  );
};

export default ProductCardPlaceholder;