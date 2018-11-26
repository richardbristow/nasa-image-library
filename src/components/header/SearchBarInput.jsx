import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const StyledSearchBarInput = styled.div`
  margin-bottom: 20px;
  display: flex;
  display: -webkit-flex;

  input {
    padding: 10px 16px;
    width: 100%;
    font-size: 18px;
    outline: none;
    margin: 0 auto;
    flex-grow: 9;
    border: 3px solid ${({ theme }) => theme.lightGrey};
    border-radius: 4px 0 0 4px;
    color: ${({ theme }) => theme.grey};

    /* @include mqMax(360px) {
      padding: 8px 12px;
    };

    @include mqMax(500px) {
      font-size: 14px;
      padding: 8px 14px;
    }; */
  }

  button {
    .fa-search {
      font-size: 18px;
      color: ${({ theme }) => theme.grey};
      font-size: 25px;
      text-align: center;
    };
    flex-grow: 2;
    outline: none;
    background: ${({ theme }) => theme.lightGrey};
    border: 0;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
`;

const SearchBarInput = ({ searchTerm, handleInputChange }) => (
  <StyledSearchBarInput>
    <input
      name="searchTerm"
      type="text"
      value={searchTerm}
      onChange={handleInputChange}
      placeholder="e.g. ISS"
    />
    <button type="submit">
      <span className="fa fa-search" aria-hidden="true" />
    </button>
  </StyledSearchBarInput>
);

SearchBarInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default SearchBarInput;
