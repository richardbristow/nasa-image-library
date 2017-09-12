import React from 'react';
import GalleryItem from './GalleryItem';
import '../styles/css/Gallery.css';

// async function handleGetMediaData(url) {
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// }

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPage: '',
      previousPage: '',
    };

    this.renderGalleryItems = this.renderGalleryItems.bind(this);
  }

  renderGalleryItems() {
    if (Object.prototype.hasOwnProperty.call(this.props.galleryData, 'items')) {
      const imageArr = this.props.galleryData.items;
      const galleryItems = imageArr.map((image) => {
        return <GalleryItem key={image.data[0].nasa_id} imageData={image} />;
      });
      return (
        <div>
          {galleryItems}
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="gallery-wrapper">
        {this.renderGalleryItems()}
      </div>
    );
  }
}

export default Gallery;
