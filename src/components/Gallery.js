import React from 'react';
import '../styles/css/Gallery.css';

import GalleryItem from './GalleryItem';
import PageNavigation from './PageNavigation';
import GalleryModal from './GalleryModal';
import LoadingSpinner from './LoadingSpinner';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      modalDataObj: null,
      imagesLoading: false,
    };

    this.renderGalleryItems = this.renderGalleryItems.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.renderPageNavigation = this.renderPageNavigation.bind(this);
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
    for (let i = 0; i < images.length; i++) {
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
    const imagesLoading = this.state.imagesLoading;
    if (this.props.galleryData.items) {
      const imageArr = this.props.galleryData.items;
      const galleryItems = imageArr.map(image =>
        (<GalleryItem
          onImagesLoaded={this.handleImagesLoaded}
          key={image.data[0].nasa_id}
          imageData={image}
          openModal={this.openGalleryModal}
        />),
      );
      return (
        <div className={imagesLoading ? 'gallery-items-wrapper-loading' : 'gallery-items-wrapper'}>
          {galleryItems}
        </div>
      );
    }
    return null;
  }


  // Creates the next and previous buttons, based on whether there
  // are more results to display.
  // Also gets the total results for the search
  renderPageNavigation() {
    const pageNav = {
      next: null,
      prev: null,
      totalHits: null,
    };
    // Check for the metadata property, and get the total hits
    if (this.props.galleryData.metadata) {
      pageNav.totalHits = (<div className="page-nav-total-hits">
        <span className="totalHitsText">Found <span className="totalHitsTextBold">
          {this.props.galleryData.metadata.total_hits} </span>
          results.
        </span>
      </div>);
    }
    // Check for the links property
    if (this.props.galleryData.links) {
      const linkArr = this.props.galleryData.links;
      // If linkArr > 0 there are buttons to display
      if (linkArr.length > 0) {
        linkArr.forEach((link) => {
          if ((link.rel).toLowerCase() === 'next') {
            pageNav.next = (<PageNavigation
              navType="Next"
              onPageChange={this.handlePageChange}
              dataUrl={link.href}
            />);
          } else if ((link.rel).toLowerCase() === 'prev') {
            pageNav.prev = (<PageNavigation
              navType="Previous"
              onPageChange={this.handlePageChange}
              dataUrl={link.href}
            />);
          }
        });
      }
    }
    return pageNav;
  }


  render() {
    const pageNav = this.renderPageNavigation();
    const imagesLoading = this.state.imagesLoading;
    return (
      <div
        className="gallery-wrapper"
        ref={(c) => { this.galleryImages = c; }}
      >
        <GalleryModal
          modalDataObj={this.state.modalDataObj}
          isModalOpen={this.state.modalOpen}
          closeModal={this.closeGalleryModal}
        />
        {imagesLoading ? <LoadingSpinner /> : null}
        {this.renderGalleryItems()}
        <div className={imagesLoading ? 'page-navigation-wrapper-loading' : 'page-navigation-wrapper'}>
          <div className="page-navigation-buttons">
            {pageNav.prev !== null ? pageNav.prev : null}
            {pageNav.next !== null ? pageNav.next : null}
          </div>
          {pageNav.totalHits !== null ? pageNav.totalHits : null}
        </div>
      </div>
    );
  }
}

export default Gallery;
