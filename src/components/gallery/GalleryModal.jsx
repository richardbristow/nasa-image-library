import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import GalleryModalContent from './GalleryModalContent';

const StyledGalleryModalBackground = styled.div`
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
`;

const StyledModalWrapper = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.lightGrey};
  margin: auto;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.grey};
  height: auto;
  max-height: 80%;
  width: auto;
  max-width: 80%;
  border-radius: 6px;
  overflow: auto;
`;

const StyledModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 40px;
  color: ${({ theme }) => theme.lightGrey};
  background-color: transparent;
  float: right;
  font-size: 46px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
`;

const GalleryModal = ({ clickedModalMetadata, setClickedModalMetadata }) => (
  <StyledGalleryModalBackground>
    <StyledModalWrapper>
      <StyledModalCloseButton onClick={() => setClickedModalMetadata(null)}>
        &times;
      </StyledModalCloseButton>
      <GalleryModalContent clickedModalMetadata={clickedModalMetadata} />
    </StyledModalWrapper>
  </StyledGalleryModalBackground>
);

GalleryModal.propTypes = {
  setClickedModalMetadata: PropTypes.func.isRequired,
  clickedModalMetadata: PropTypes.shape({
    description: PropTypes.string,
    mediaType: PropTypes.string,
    nasaId: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default GalleryModal;
