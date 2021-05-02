import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const StyledError = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const Error = ({ error }) => {
  return (
    <StyledError>
      <p>Houston we have a problem.</p>
      <p>Something went wrong.</p>
      {error.message && (
        <p>
          <span
            css={`
              font-weight: bold;
            `}
          >
            Error code:{' '}
          </span>
          {error.message}
        </p>
      )}
    </StyledError>
  );
};

Error.defaultProps = {
  error: {
    message: '',
  },
};

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default Error;
