import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import GalleryModal from '../gallery-modal/GalleryModal';
import GalleryNavigation from '../gallery-navigation/GalleryNavigation';
import GalleryGrid from './GalleryGrid';
import Error from '../shared/Errors';
import getData from '../../utils/getData';

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
      searchData: [],
      pageLinks: [],
      totalHits: null,
      errorFetching: null,
    };

    this.closeGalleryModal = this.closeGalleryModal.bind(this);
    this.openGalleryModal = this.openGalleryModal.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const url = 'https://images-api.nasa.gov/search?q=iss&media_type=image';
    this.handleSearch(encodeURI(url));
  }

  componentDidUpdate(prevProps) {
    const { query } = this.props;
    if (query !== prevProps.query) {
      const url = `https://images-api.nasa.gov/search?q=${query.q}&media_type=${query.media_type.toString()}`;
      this.handleSearch(url);
    }
  }

  async handleSearch(url, event) {
    if (event) { event.preventDefault(); }
    const { errorFetching, data } = await getData(url);
    const {
      items: searchData = [], metadata: { total_hits: totalHits } = 0, links: pageLinks = [],
    } = data;
    this.setState({
      errorFetching, searchData, totalHits, pageLinks,
    });
    window.scrollTo(0, 0);
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
    const {
      clickedModalMetadata, searchData, totalHits, pageLinks, errorFetching,
    } = this.state;
    return (
      <StyledGallery>
        {clickedModalMetadata
          && (
          <GalleryModal
            clickedModalMetadata={clickedModalMetadata}
            closeGalleryModal={this.closeGalleryModal}
          />
          )}
        {errorFetching
          ? <Error />
          : (
            <Fragment>
              <GalleryGrid searchData={searchData} openGalleryModal={this.openGalleryModal} />
              <GalleryNavigation
                totalHits={totalHits}
                pageLinks={pageLinks}
                handleSearch={this.handleSearch}
              />
            </Fragment>
          )}
      </StyledGallery>
    );
  }
}

Gallery.propTypes = {
  query: PropTypes.shape({
    q: PropTypes.string,
    media_type: PropTypes.string,
  }).isRequired,
};

export default Gallery;
