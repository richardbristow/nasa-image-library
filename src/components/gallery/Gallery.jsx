import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import GalleryModal from '../gallery-modal/GalleryModal';
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
      clickedModalMetadata: null,
      imagesLoading: false,
    };

    this.closeGalleryModal = this.closeGalleryModal.bind(this);
    this.openGalleryModal = this.openGalleryModal.bind(this);
    this.handleImagesLoaded = this.handleImagesLoaded.bind(this);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  closeGalleryModal() {
    this.setState({
      clickedModalMetadata: null,
    });
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

  openGalleryModal(itemData) {
    const {
      media_type: mediaType, title, description, nasa_id: nasaId,
    } = itemData;
    this.setState({
      clickedModalMetadata: {
        nasaId, title, description, mediaType,
      },
    });
  }

  render() {
    const { imagesLoading, clickedModalMetadata } = this.state;
    const { searchData, handlePageChange } = this.props;
    const { items } = searchData;
    return (
      <StyledGallery ref={(c) => { this.galleryImages = c; }}>
        {clickedModalMetadata
          && (
          <GalleryModal
            clickedModalMetadata={clickedModalMetadata}
            closeGalleryModal={this.closeGalleryModal}
          />)}
        {imagesLoading && <Loading />}
        <GalleryGrid items={items} openGalleryModal={this.openGalleryModal} />
        {!imagesLoading
          && <GalleryNavigation searchData={searchData} handlePageChange={handlePageChange} />}
      </StyledGallery>
    );
  }
}

Gallery.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  searchData: PropTypes.object.isRequired,
};

export default Gallery;
