import React from 'react';

const SearchBarCheckbox = ({ label, name, checked, handleInputChange }) => {
  return (
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
};

export default SearchBarCheckbox;
