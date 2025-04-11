import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SortDropdown from '../SortDropdown';

describe('SortDropdown', () => {
    it('renders the dropdown with the correct initial text', () => {
        const { getByText } = render(<SortDropdown sortBy={null} onSortByChange={() => {}} />);
        expect(getByText('Sort by: None')).toBeInTheDocument();
    });

    it('calls onSortByChange with "price" when Price is clicked', () => {
        const onSortByChange = jest.fn();
        const { getByText } = render(<SortDropdown sortBy={null} onSortByChange={onSortByChange} />);

        fireEvent.click(getByText('Sort by: None'));
        fireEvent.click(getByText('Price'));

        expect(onSortByChange).toHaveBeenCalledWith('price');
    });

    it('calls onSortByChange with "rating" when Rating is clicked', () => {
        const onSortByChange = jest.fn();
        const { getByText } = render(<SortDropdown sortBy={null} onSortByChange={onSortByChange} />);

        fireEvent.click(getByText('Sort by: None'));
        fireEvent.click(getByText('Rating'));

        expect(onSortByChange).toHaveBeenCalledWith('rating');
    });

    it('displays the sortBy value correctly', () => {
        const { getByText } = render(<SortDropdown sortBy="price" onSortByChange={() => {}} />);
        expect(getByText('Sort by: Price')).toBeInTheDocument();
    });
});