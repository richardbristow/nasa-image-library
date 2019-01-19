import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import GalleryItem from './GalleryItem';

const StyledGalleryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GalleryGrid = ({ items, openGalleryModal }) => (
  <StyledGalleryGrid>
    {items.map((item) => {
      const [itemData] = item.data;
      let imageThumbnail;
      if (item.links) {
        [imageThumbnail] = item.links;
      }
      return (
        <GalleryItem
          key={itemData.nasa_id}
          itemData={itemData}
          imageThumbnail={imageThumbnail}
          openGalleryModal={openGalleryModal}
        />
      );
    })}
  </StyledGalleryGrid>
);

GalleryGrid.propTypes = {
  items: PropTypes.array.isRequired,
  openGalleryModal: PropTypes.func.isRequired,
};

export default GalleryGrid;
