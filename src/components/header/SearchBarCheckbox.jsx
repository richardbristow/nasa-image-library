import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const StyledSearchBarCheckbox = styled.label`
  input {
    margin-right: 5%;
  }

  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

const SearchBarCheckbox = ({
  label, name, checked, handleCheckboxChange,
}) => (
  <StyledSearchBarCheckbox>
    {label}
    <input
      name={name}
      type="checkbox"
      checked={checked}
      onChange={handleCheckboxChange}
    />
  </StyledSearchBarCheckbox>
);

SearchBarCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default SearchBarCheckbox;
