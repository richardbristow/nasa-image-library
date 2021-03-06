import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const StyledSearchBarCheckbox = styled.label`
  cursor: pointer;

  input {
    margin-right: 5%;
    margin-left: 6px;
    vertical-align: middle;
    cursor: pointer;
  }

  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

const SearchBarCheckbox = ({ label, name, checked, handleInputChange }) => (
  <StyledSearchBarCheckbox>
    {label}
    <input
      name={name}
      type="checkbox"
      checked={checked}
      onChange={handleInputChange}
    />
  </StyledSearchBarCheckbox>
);

SearchBarCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default SearchBarCheckbox;
