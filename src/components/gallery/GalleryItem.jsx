import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/css/GalleryItem.css';

const GalleryItem = ({ itemData, itemLinks, openGalleryModal }) => {
  const {
    media_type: mediaType, title, description, nasa_id: nasaId,
  } = itemData;
  const { href } = itemLinks;
  return (
    <div
      className={`gallery-item gallery-item-${mediaType !== 'image' && 'audio-video'}`}
      role="presentation"
      onClick={openGalleryModal}
      data-media-type={mediaType}
      data-media-title={title}
      data-media-desc={description}
      data-nasa-id={nasaId}
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
    </div>
  );
};

GalleryItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  itemLinks: PropTypes.object.isRequired,
  openGalleryModal: PropTypes.func.isRequired,
};

export default GalleryItem;
