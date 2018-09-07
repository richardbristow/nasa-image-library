import React from 'react';

const SearchBarCheckbox = ({ label, name, checked }) => {
  return (
    <React.Fragment>
      <label htmlFor="imageCheckbox">{label}</label>
      <input
        name={name}
        type="checkbox"
        id={`${name}Checkbox`}
        checked={checked}
        onChange={this.handleInputChange}
      />
    </React.Fragment>
  );
};

export default SearchBarCheckbox;