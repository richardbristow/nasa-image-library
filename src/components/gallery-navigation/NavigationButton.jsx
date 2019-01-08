import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';

const StyledNavigationButton = styled.button`
  display: inline-block;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.grey};
  border: 2px solid ${({ theme }) => theme.lightGrey};
  font-size: 24px;
  padding: 18px 32px;
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.ghostWhite};
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.lightGrey};
    color: ${({ theme }) => theme.grey};
    border: 2px solid ${({ theme }) => theme.grey};
  }

  @media screen and (max-width: 700px) {
    font-size: 14px;
    padding: 10px 18px;
  }
`;

const NavigationButton = ({ handlePageChange, navType, url }) => (
  <StyledNavigationButton onClick={() => handlePageChange(url)}>
    {navType}
  </StyledNavigationButton>
);

NavigationButton.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  navType: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default NavigationButton;
