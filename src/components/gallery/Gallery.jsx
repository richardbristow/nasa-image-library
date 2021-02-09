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
  const [clickedModalMetadata, setClickedModalMetadata] = useState(null);
  return (
    <StyledGallery>
      {clickedModalMetadata && (
        <GalleryModal
          clickedModalMetadata={clickedModalMetadata}
          setClickedModalMetadata={setClickedModalMetadata}
        />
      )}
      <StyledGalleryGrid>
        {data.collection.items.map((item) => {
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
              setClickedModalMetadata={setClickedModalMetadata}
            />
          );
        })}
      </StyledGalleryGrid>
      <GalleryNavigation data={data} doFetch={doFetch} />
    </StyledGallery>
  );
};

Gallery.propTypes = {
  data: PropTypes.shape({
    collection: PropTypes.shape({
      href: PropTypes.string,
      // eslint-disable-next-line react/forbid-prop-types
      items: PropTypes.array,
      // eslint-disable-next-line react/forbid-prop-types
      links: PropTypes.array,
      // eslint-disable-next-line react/forbid-prop-types
      metadata: PropTypes.object,
      version: PropTypes.string,
    }),
  }).isRequired,
  doFetch: PropTypes.func.isRequired,
};

export default Gallery;
