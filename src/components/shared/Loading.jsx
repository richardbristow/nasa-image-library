import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import Errors from './Errors';

const StyledLoading = styled.div`
  width: 100%;
  font-size: 100px;
  color: ${({ theme }) => theme.lightGrey};
  text-align: center;
  margin-top: 20%;

  /* This was in App scss */
  /* background: ${({ theme }) => theme.ghostWhite};
  max-width: 100%;
  // max-width: 1200px;
  margin: 0 auto; */
`;

const Loading = ({ error }) => (
  <StyledLoading>
    {error ? <Errors /> : <i className="fa fa-circle-o-notch fa-spin" />}
  </StyledLoading>
);

Loading.defaultProps = {
  error: null,
};

Loading.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  error: PropTypes.object,
};

export default Loading;
