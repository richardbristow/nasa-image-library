import React from 'react';
import '../styles/css/GalleryItem.css';

const GalleryItem = (props) => {
  const itemData = props.imageData.data[0];
  return (
    <div
      className={`gallery-item gallery-item-${itemData.media_type !== 'image' && 'audio-video'}`}
      role="presentation"
      onClick={props.openModal}
      data-media-type={itemData.media_type}
      data-media-title={itemData.title}
      data-media-desc={itemData.description}
      data-nasa-id={itemData.nasa_id}
    >
      {itemData.media_type === 'image'
        ? <img onLoad={props.onImagesLoaded} src={props.imageData.links[0].href} alt={itemData.title} />
        : (
          <React.Fragment>
            <i className={`fa ${itemData.media_type === 'audio' ? 'fa-volume-up' : 'fa-video-camera'}`} aria-hidden="true" />
            <p>{itemData.title}</p>
          </React.Fragment>
        )
      }
    </div>
  );
};

export default GalleryItem;
