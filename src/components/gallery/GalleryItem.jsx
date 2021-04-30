import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import Modal from '../modal/Modal';
import ModalContent from '../modal/ModalContent';

const StyledGalleryItem = styled.div`
  cursor: pointer;
  flex-grow: 1;
  margin: 0.4em;
  height: 200px;
  background-color: ${({ theme }) => theme.lightGrey};
  min-width: 200px;
  border-radius: 4px;
  ${({ mediaType }) => mediaType === 'audio' && 'width: 200px;'}

  img {
    height: 200px;
    object-fit: cover;
    max-width: 100%;
    min-width: 100%;
    vertical-align: bottom;
    &:hover {
      opacity: 0.7;
    }
    border-radius: 4px;
  }

  .gallery-item-audio {
    display: flex;
    justify-content: center;
    height: 200px;
    width: 100%;
    background: ${({ theme }) => theme.grey};
    text-align: center;
    color: ${({ theme }) => theme.lightGrey};
    overflow: hidden;
    border-radius: 4px;

    div {
      align-self: center;
    }

    i {
      padding: 3%;
      font-size: 60px;
    }

    p {
      padding: 3%;
      font-size: 12px;
      line-height: 20px;
      overflow: hidden;
    }
  }
`;

const GalleryItem = ({ itemData, imageThumbnail }) => {
  const [clickedModalMetadata, setClickedModalMetadata] = useState(null);
  const { media_type: mediaType, title } = itemData;
  const { href } = imageThumbnail;
  return (
    <>
      <StyledGalleryItem
        role="presentation"
        onClick={() => setClickedModalMetadata(itemData)}
        mediaType={mediaType}
      >
        {mediaType !== 'audio' ? (
          <img
            onError={(e) => {
              e.target.parentNode.style.display = 'none';
            }}
            src={href}
            alt={title}
          />
        ) : (
          <div className="gallery-item-audio">
            <div>
              <i className="fa fa-volume-up" aria-hidden="true" />
              <p>{title}</p>
            </div>
          </div>
        )}
      </StyledGalleryItem>
      {clickedModalMetadata && (
        <Modal setClickedModalMetadata={setClickedModalMetadata}>
          <ModalContent clickedModalMetadata={clickedModalMetadata} />
        </Modal>
      )}
    </>
  );
};

GalleryItem.defaultProps = {
  imageThumbnail: { href: '#' },
};

GalleryItem.propTypes = {
  itemData: PropTypes.shape({
    media_type: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  imageThumbnail: PropTypes.shape({
    href: PropTypes.string,
  }),
};

export default GalleryItem;
