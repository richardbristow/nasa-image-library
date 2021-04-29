import React from 'react';
import ReactDOM from 'react-dom';
import styled, { ThemeProvider } from 'styled-components/macro';

import { GlobalStyle, globalTheme } from '../../theme/globalStyle';

const StyledModalOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
`;

const StyledModalCloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 10px;
  color: ${({ theme }) => theme.lightGrey};
  background-color: transparent;
  float: right;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
`;

const GalleryModal = ({ children, setClickedModalMetadata }) =>
  ReactDOM.createPortal(
    <ThemeProvider theme={globalTheme}>
      <GlobalStyle />
      <StyledModalOverlay onClick={() => setClickedModalMetadata(null)}>
        <StyledModalCloseButton>&times;</StyledModalCloseButton>
        {children}
      </StyledModalOverlay>
    </ThemeProvider>,
    document.querySelector('#modal-root'),
  );

export default GalleryModal;
