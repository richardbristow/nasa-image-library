import React from 'react';
import styled from 'styled-components/macro';

import GalleryItem from './GalleryItem';

const StyledGalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* column-gap: 1em;
  line-height: 0;
  padding: 0; */

  /* @include mqMin(360px) {
    column-count: 2;
  };

  @include mqMin(700px) {
    column-count: 3;
  };

  @include mqMin(900px) {
    column-count: 4;
  };

  @include mqMin(1200px) {
    column-count: 5;
  }; */
`;

const GalleryGrid = ({ searchData, openGalleryModal }) => {
  const { items } = searchData;

  return (
    <StyledGalleryGrid>
      {items.map(item => (
        <GalleryItem
          // onImagesLoaded={this.handleImagesLoaded}
          key={item.data[0].nasa_id}
          imageData={item}
          openModal={openGalleryModal}
        />
      ))}
    </StyledGalleryGrid>
  );
};

export default GalleryGrid;
