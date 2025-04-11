import React from 'react';
import { Table, Accordion, Form } from 'react-bootstrap';

const ProductComparisonView = React.memo(({ products }) => {
  if (!products || products.length === 0) {
    return <p>Please Select the Products to Compare(Max Limit -3)</p>;
  }

  const [highlightDifferences, setHighlightDifferences] = React.useState(false);

  const areValuesDifferent = (propertyValues) => {
    const firstValue = Object.values(propertyValues)[0];
    return Object.values(propertyValues).some(value => typeof value === 'object' ? JSON.stringify(value) !== JSON.stringify(firstValue) : value !== firstValue);
  };

  return (
    <div>
      <Form.Check
        type="checkbox"
        id="highlight-toggle"
        label="Highlight Differences"
        checked={highlightDifferences}
        onChange={(e) => setHighlightDifferences(e.target.checked)}
        className="mb-3"
      />

      {products.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th></th>
              {products.map(product => (
                <th key={product.id}>{product.title.substring(0, 20)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Image</td>
              {products.map(product => (
                <td key={product.id}><img src={product.image} alt={product.title} style={{ height: '50px', width: '50px', objectFit: 'contain' }} /></td>
              ))}
            </tr>
            <tr>
              <td>Price</td>
              {products.map(product => (
                <td
                  key={product.id}
                  style={{
                    backgroundColor: highlightDifferences && areValuesDifferent(Object.fromEntries(products.map(p => [p.id, p.price]))) ? '#FFFFE0' : 'transparent',
                  }}
                >
                  ${product.price.toFixed(2)}
                </td>
              ))}
            </tr>
            <tr>
              <td>Rating</td>
              {products.map(product => (
                <td
                  key={product.id}
                  style={{
                    backgroundColor: highlightDifferences && areValuesDifferent(Object.fromEntries(products.map(p => [p.id, p.rating.rate]))) ? '#FFFFE0' : 'transparent',
                  }}
                >
                  {product.rating.rate} ({product.rating.count} reviews)
                </td>
              ))}
            </tr>
            <tr>
              <td>Category</td>
              {products.map(product => (
                <td
                  key={product.id}
                  style={{
                    backgroundColor: highlightDifferences && areValuesDifferent(Object.fromEntries(products.map(p => [p.id, p.category]))) ? '#FFFFE0' : 'transparent',
                  }}
                >
                  {product.category} ({product.category})
                </td>
              ))}
            </tr>
            <tr>
              <td>Description</td>
              {products.map(product => (
                <td
                  key={product.id}
                  style={{
                    backgroundColor: highlightDifferences && areValuesDifferent(Object.fromEntries(products.map(p => [p.id, p.description]))) ? '#FFFFE0' : 'transparent',
                  }}
                >
                  {product.description} ({product.description})
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
});

export default ProductComparisonView;