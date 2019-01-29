import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import GalleryItem from './GalleryItem';

const StyledGalleryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;

  &:after {
    content: '';
    flex-grow: 999999999;
  }
`;

const GalleryGrid = ({ searchData, openGalleryModal }) => (
  <StyledGalleryGrid>
    {searchData.map((item) => {
      const [itemData] = item.data;
      let imageThumbnail;
      if (item.links) { [imageThumbnail] = item.links; }
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
  searchData: PropTypes.arrayOf(PropTypes.object).isRequired,
  openGalleryModal: PropTypes.func.isRequired,
};

export default GalleryGrid;
