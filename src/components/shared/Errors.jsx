import React from 'react';
import styled from 'styled-components';

const StyledErrors = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const Errors = () => (
  <StyledErrors>
    <p>Houston we have a problem.</p>
    <p>Something went wrong.</p>
  </StyledErrors>
);

export default Errors;
