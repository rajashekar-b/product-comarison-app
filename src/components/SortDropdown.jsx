import React from 'react';
import { Dropdown } from 'react-bootstrap';

const SortDropdown = ({ sortBy, onSortByChange }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-sort">
        Sort by: {sortBy ? sortBy.charAt(0).toUpperCase() + sortBy.slice(1) : 'None'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onSortByChange(null)}>None</Dropdown.Item>
        <Dropdown.Item onClick={() => onSortByChange('price')}>Price</Dropdown.Item>
        <Dropdown.Item onClick={() => onSortByChange('rating')}>Rating</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;