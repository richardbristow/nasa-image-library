import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    background: lighten($grey, 5%);
    text-align: center;
    color: $lightGrey;
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

const GalleryItem = ({ itemData, itemLinks, openGalleryModal }) => {
  const { media_type: mediaType, title } = itemData;
  const { href } = itemLinks;
  return (
    <StyledGalleryItem
      className={`gallery-item-${mediaType !== 'image' && 'audio-video'}`}
      role="presentation"
      onClick={() => openGalleryModal(itemData)}
    >
      {mediaType === 'image'
        ? <img src={href} alt={title} />
        : (
          <React.Fragment>
            <i className={`fa ${mediaType === 'audio' ? 'fa-volume-up' : 'fa-video-camera'}`} aria-hidden="true" />
            <p>{title}</p>
          </React.Fragment>
        )
      }
    </StyledGalleryItem>
  );
};

GalleryItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  itemLinks: PropTypes.object.isRequired,
  openGalleryModal: PropTypes.func.isRequired,
};

export default GalleryItem;
