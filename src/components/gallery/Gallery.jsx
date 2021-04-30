import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import Error from '../shared/Error';
import Loading from '../shared/Loading';
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

const Gallery = ({
  data,
  doFetch,
  setClickedModalMetadata,
  isError,
  isLoading,
}) => {
  const { items } = data;
  return (
    <>
      {isError && <Error />}
      {isLoading ? (
        <Loading />
      ) : (
        <StyledGallery>
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
      )}
    </>
  );
};

Gallery.defaultProps = {
  isError: null,
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
  setClickedModalMetadata: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.shape({}),
};

export default Gallery;
