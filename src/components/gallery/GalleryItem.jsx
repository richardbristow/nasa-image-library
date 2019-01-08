import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const StyledGalleryItem = styled.div`
  width: 100%;
  height: auto;
  display: inline-block;
  margin: 0 0 1em;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    &:hover {
      opacity: 0.7;
    }
  }

  .gallery-item-audio-video {
    height: 140px;
    width: 100%;
    background: ${({ theme }) => theme.grey};
    text-align: center;
    color: ${({ theme }) => theme.lightGrey};
    overflow: hidden;

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

const GalleryItem = ({ itemData, imageThumbnail, openGalleryModal }) => {
  const { media_type: mediaType, title } = itemData;
  return (
    <StyledGalleryItem
      // className={`gallery-item-${mediaType !== 'image' && 'audio-video'}`}
      role="presentation"
      onClick={() => openGalleryModal(itemData)}
    >
      {mediaType === 'image'
        ? <img src={imageThumbnail.href} alt={title} />
        : (
          <div className="gallery-item-audio-video">
            <i className={`fa ${mediaType === 'audio' ? 'fa-volume-up' : 'fa-video-camera'}`} aria-hidden="true" />
            <p>{title}</p>
          </div>
        )
      }
    </StyledGalleryItem>
  );
};

// TODO: add an image thumbnail image here
GalleryItem.defaultProps = {
  imageThumbnail: { href: '#' },
};

GalleryItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  imageThumbnail: PropTypes.object,
  openGalleryModal: PropTypes.func.isRequired,
};

export default GalleryItem;