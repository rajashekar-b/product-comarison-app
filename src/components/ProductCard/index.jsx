import React from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from './ProductCard.module.css';
import Image from 'next/image';

const ProductCard = React.memo(({ product, isSelected, onToggleSelect, disabled }) => {
  return (
    <Card className={`${styles.productCard} mb-4`}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.title}
          className={styles.productImage}
          width={150}
          height={150}
        />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="mb-2">{product.title.substring(0, 50)}</Card.Title>
          <Card.Text className="small text-muted">{product.category}</Card.Text>
          <Card.Text className="fw-bold">${product.price.toFixed(2)}</Card.Text>
        </div>
        <Button
          variant={isSelected ? 'danger' : 'primary'}
          onClick={() => onToggleSelect(product.id)}
          disabled={disabled}
        >
          {isSelected ? 'Remove' : 'Compare'}
        </Button>
      </Card.Body>
    </Card>
  );
});

export default ProductCard;