import React from 'react';
import styled from 'styled-components/macro';

const StyledError = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const Error = () => (
  <StyledError>
    <p>Houston we have a problem.</p>
    <p>Something went wrong.</p>
  </StyledError>
);

export default Error;
