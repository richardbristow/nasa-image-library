import React from 'react';
import '../styles/css/GalleryItem.css';

// Creates the individual items for the gallery,
// based on the media type.
function GalleryItem(props) {
  const itemData = props.imageData.data[0];
  if (itemData.media_type === 'image') {
    // Media type = Image
    return (
      <div
        className="gallery-item"
        role="presentation"
        onClick={props.openModal}
        data-media-type="image"
        data-media-title={itemData.title}
        data-media-desc={itemData.description}
        data-nasa-id={itemData.nasa_id}
      >
        <img
          onLoad={props.onImagesLoaded}
          src={props.imageData.links[0].href}
          alt={itemData.title}
        />
      </div>
    );
  } else if (itemData.media_type === 'video') {
    // Media type = Videos
    return (
      <div
        className="gallery-item gallery-item-audio-video"
        role="presentation"
        onClick={props.openModal}
        data-media-type="video"
        data-media-title={itemData.title}
        data-media-desc={itemData.description}
        data-nasa-id={itemData.nasa_id}
      >
        <i className="fa fa-video-camera" aria-hidden="true" />
        <p>{itemData.title}</p>
      </div>
    );
  } else if (itemData.media_type === 'audio') {
    // Media type = audio
    return (
      <div
        className="gallery-item gallery-item-audio-video"
        role="presentation"
        onClick={props.openModal}
        data-media-type="audio"
        data-media-title={itemData.title}
        data-media-desc={itemData.description}
        data-nasa-id={itemData.nasa_id}
      >
        <i className="fa fa-volume-up" aria-hidden="true" />
        <p>{itemData.title}</p>
      </div>
    );
  }
  return null;
}

export default GalleryItem;
