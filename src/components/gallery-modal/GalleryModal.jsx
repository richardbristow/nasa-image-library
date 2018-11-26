import React from 'react';
import styled from 'styled-components/macro';

import GalleryModalContent from './GalleryModalContent';

const StyledGalleryModalBackground = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 80px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.9);
`;

const StyledModalWrapper = styled.div`
  display: block;
  background-color: ${({ theme }) => theme.lightGrey};
  margin: auto;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.grey};
  height: 80%;
  max-width: 80%;
  border-radius: 6px;
  overflow: auto;
`;

const StyledModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 40px;
  color: #aaaaaa;
  float: right;
  font-size: 46px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
`;

const GalleryModal = ({ clickedModalMetadata, closeGalleryModal }) => {
  return (
    <StyledGalleryModalBackground>
      <StyledModalWrapper>
        <StyledModalCloseButton onClick={closeGalleryModal}>
          &times;
        </StyledModalCloseButton>
        <GalleryModalContent clickedModalMetadata={clickedModalMetadata} />
      </StyledModalWrapper>
    </StyledGalleryModalBackground>
  );
};

export default GalleryModal;
