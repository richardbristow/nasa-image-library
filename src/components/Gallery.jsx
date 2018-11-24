import React, { Component } from 'react';

import '../styles/css/Gallery.css';

import GalleryItem from './GalleryItem';
import GalleryModal from './GalleryModal';
import Loading from './shared/Loading';
import GalleryNavigation from './gallery-navigation/GalleryNavigation';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      modalDataObj: null,
      imagesLoading: false,
    };

    this.renderGalleryItems = this.renderGalleryItems.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.closeGalleryModal = this.closeGalleryModal.bind(this);
    this.openGalleryModal = this.openGalleryModal.bind(this);
    this.handleImagesLoaded = this.handleImagesLoaded.bind(this);
  }


  // Closes the modal
  closeGalleryModal() {
    this.setState({
      modalOpen: false,
      modalDataObj: null,
    });
  }


  // Handles the click event for the previous and next buttons
  handlePageChange(event) {
    const pageUrl = event.target.dataset.pageUrl;
    this.props.onGetData(pageUrl);
  }


  // Querys the dom to check if the images in the gallery have loaded
  handleImagesLoaded() {
    let images = null;
    images = this.galleryImages.querySelectorAll('img');
    let allLoaded = true;
    for (let i = 0; i < images.length; i += 1) {
      if (!images[i].complete) {
        allLoaded = false;
      }
    }
    this.setState({
      imagesLoading: !allLoaded,
    });
  }


  // Handles the click event to open a modal
  openGalleryModal(event) {
    let itemData = event.target.parentNode.dataset;
    if (event.target.parentNode.className === 'gallery-items-wrapper') {
      itemData = event.target.dataset;
    }
    this.setState({
      modalOpen: true,
      modalDataObj: {
        modalNasaId: itemData.nasaId,
        modalTitle: itemData.mediaTitle,
        modalDescription: itemData.mediaDesc,
        modalType: itemData.mediaType,
      },
    });
  }


  // Loops through the api results and returns gallery items
  renderGalleryItems() {
    const { imagesLoading } = this.state;
    if (this.props.galleryData.items) {
      const imageArr = this.props.galleryData.items;
      const galleryItems = imageArr.map(image => (
        <GalleryItem
          onImagesLoaded={this.handleImagesLoaded}
          key={image.data[0].nasa_id}
          imageData={image}
          openModal={this.openGalleryModal}
        />
      ));
      return (
        <div className={imagesLoading ? 'gallery-items-wrapper-loading' : 'gallery-items-wrapper'}>
          {galleryItems}
        </div>
      );
    }
    return null;
  }

  render() {
    const { imagesLoading, modalDataObj, modalOpen } = this.state;
    const { galleryData } = this.props;
    return (
      <div
        className="gallery-wrapper"
        ref={(c) => { this.galleryImages = c; }}
      >
        <GalleryModal
          modalDataObj={modalDataObj}
          isModalOpen={modalOpen}
          closeModal={this.closeGalleryModal}
        />
        {imagesLoading && <Loading />}
        {this.renderGalleryItems()}
        {!imagesLoading
          && <GalleryNavigation galleryData={galleryData} onPageChange={this.handlePageChange} />}
      </div>
    );
  }
}

export default Gallery;
