import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Errors from './Errors';

const StyledLoading = styled.div`
  width: 100%;
  font-size: 100px;
  color: ${({ theme }) => theme.lightGrey};
  text-align: center;
  margin-top: 20%;
`;

const Loading = ({ error }) => (
  <StyledLoading>
    {error
      ? <Errors />
      : <i className="fa fa-circle-o-notch fa-spin" />
    }
  </StyledLoading>
);

Loading.defaultProps = {
  error: false,
};

Loading.propTypes = {
  error: PropTypes.bool,
};

export default Loading;
