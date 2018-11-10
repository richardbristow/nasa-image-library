import React from 'react';
import PropTypes from 'prop-types';

const SearchBarCheckbox = ({
  label, name, checked, handleInputChange,
}) => (
  <React.Fragment>
    <label htmlFor={`${name}Checkbox`}>
      {label}
      <input
        name={name}
        type="checkbox"
        id={`${name}Checkbox`}
        checked={checked}
        onChange={handleInputChange}
      />
    </label>
  </React.Fragment>
);

SearchBarCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default SearchBarCheckbox;
