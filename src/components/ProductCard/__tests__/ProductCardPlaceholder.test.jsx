import React from 'react';
import { render } from '@testing-library/react';
import ProductCardPlaceholder from '../ProductCardPlaceholder';

describe('ProductCardPlaceholder', () => {
    it('renders placeholder elements', () => {
        const { getByRole, getAllByRole } = render(<ProductCardPlaceholder />);
        expect(getByRole('img')).toHaveClass('imageContainer');
    });
});