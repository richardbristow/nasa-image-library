import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import GalleryModal from '../gallery-modal/GalleryModal';
// import Loading from '../shared/Loading';
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
    };

    this.closeGalleryModal = this.closeGalleryModal.bind(this);
    this.openGalleryModal = this.openGalleryModal.bind(this);
  }

  closeGalleryModal() {
    this.setState({
      clickedModalMetadata: null,
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
    const { clickedModalMetadata } = this.state;
    const { searchData, handlePageChange } = this.props;
    const { items } = searchData;
    return (
      <StyledGallery>
        {clickedModalMetadata
          && (
          <GalleryModal
            clickedModalMetadata={clickedModalMetadata}
            closeGalleryModal={this.closeGalleryModal}
          />
          )}
        {/* <Loading /> */}
        <GalleryGrid items={items} openGalleryModal={this.openGalleryModal} />
        <GalleryNavigation searchData={searchData} handlePageChange={handlePageChange} />
      </StyledGallery>
    );
  }
}

Gallery.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  searchData: PropTypes.shape({
    href: PropTypes.string,
    items: PropTypes.array,
    links: PropTypes.array,
    metadata: PropTypes.object,
    version: PropTypes.string,
  }).isRequired,
};

export default Gallery;
