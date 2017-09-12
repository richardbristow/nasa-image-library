import React from 'react';
import '../styles/css/GalleryItem.css';

function GalleryItem(props) {
  const itemData = props.imageData.data[0];
  if (itemData.media_type === 'image') {
    return (
      <div>
        <img
          data-media-type="image"
          data-media-title={itemData.title}
          data-media-desc={itemData.description}
          data-nasa_id={itemData.nasa_id}
          src={props.imageData.links[0].href}
          alt={itemData.title}
        />
      </div>
    );
  } else if (itemData.media_type === 'video') {
    return (
      <div>
        <img
          data-media-type="video"
          data-media-title={itemData.title}
          data-media-desc={itemData.description}
          data-nasa_id={itemData.nasa_id}
          src="http://via.placeholder.com/250x150"
          alt={itemData.title}
        />
      </div>
    );
  } else if (itemData.media_type === 'audio') {
    return (
      <div>
        <img
          data-media-type="audio"
          data-media-title={itemData.title}
          data-media-desc={itemData.description}
          data-nasa_id={itemData.nasa_id}
          src="http://via.placeholder.com/250x150"
          alt={itemData.title}
        />
      </div>
    );
  }

  return null;
}

export default GalleryItem;
