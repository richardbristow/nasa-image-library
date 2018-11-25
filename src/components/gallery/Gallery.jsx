import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import GalleryModal from './GalleryModal';
import Loading from '../shared/Loading';
import GalleryNavigation from '../gallery-navigation/GalleryNavigation';
import GalleryGrid from './GalleryGrid';

const StyledGallery = styled.div`
  background: ${({ theme }) => theme.ghostWhite};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
`;

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      modalDataObj: null,
      imagesLoading: false,
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.closeGalleryModal = this.closeGalleryModal.bind(this);
    this.openGalleryModal = this.openGalleryModal.bind(this);
    this.handleImagesLoaded = this.handleImagesLoaded.bind(this);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  // Closes the modal
  closeGalleryModal() {
    this.setState({
      modalOpen: false,
      modalDataObj: null,
    });
  }


  // Handles the click event for the previous and next buttons
  handlePageChange(url) {
    const { getData } = this.props;
    getData(url);
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

  render() {
    const { imagesLoading, modalDataObj, modalOpen } = this.state;
    const { searchData } = this.props;
    const { items } = searchData;
    return (
      <StyledGallery ref={(c) => { this.galleryImages = c; }}>
        <GalleryModal
          modalDataObj={modalDataObj}
          isModalOpen={modalOpen}
          closeModal={this.closeGalleryModal}
        />
        {imagesLoading && <Loading />}
        <GalleryGrid items={items} openGalleryModal={this.openGalleryModal} />
        {!imagesLoading
          && <GalleryNavigation searchData={searchData} handlePageChange={this.handlePageChange} />}
      </StyledGallery>
    );
  }
}

Gallery.propTypes = {
  getData: PropTypes.func.isRequired,
  searchData: PropTypes.object.isRequired,
};

export default Gallery;
