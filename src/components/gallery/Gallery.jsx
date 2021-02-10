import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import GalleryModal from './GalleryModal';
import GalleryNavigation from './GalleryNavigation';
import GalleryItem from './GalleryItem';

const StyledGallery = styled.div`
  background: ${({ theme }) => theme.ghostWhite};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
`;

const StyledGalleryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;

  &:after {
    content: '';
    flex-grow: 999999999;
  }
`;

const Gallery = ({ data, doFetch }) => {
  const { items } = data;
  const [clickedModalMetadata, setClickedModalMetadata] = useState(null);
  return (
    <StyledGallery>
      {clickedModalMetadata && (
        <GalleryModal
          clickedModalMetadata={clickedModalMetadata}
          setClickedModalMetadata={setClickedModalMetadata}
        />
      )}
      {items && (
        <StyledGalleryGrid>
          {items.map((item) => {
            const { data: [itemData] = [] } = item;
            const { links: [imageThumbnail] = [] } = item;
            return (
              <GalleryItem
                key={itemData.nasa_id}
                itemData={itemData}
                imageThumbnail={imageThumbnail}
                setClickedModalMetadata={setClickedModalMetadata}
              />
            );
          })}
        </StyledGalleryGrid>
      )}
      <GalleryNavigation data={data} doFetch={doFetch} />
    </StyledGallery>
  );
};

Gallery.propTypes = {
  data: PropTypes.shape({
    href: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    links: PropTypes.arrayOf(PropTypes.object),
    metadata: PropTypes.shape({
      total_hits: PropTypes.number,
    }),
    version: PropTypes.string,
  }).isRequired,
  doFetch: PropTypes.func.isRequired,
};

export default Gallery;
