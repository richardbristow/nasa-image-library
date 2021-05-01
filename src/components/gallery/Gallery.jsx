import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import Error from '../shared/Error';
import Loading from '../shared/Loading';
import GalleryNavigation from './GalleryNavigation';
import GalleryItem from './GalleryItem';

const StyledGalleryGrid = styled.div`
  display: flex;
  flex-wrap: wrap;

  &:after {
    content: '';
    flex-grow: 999999999;
  }
`;

const Gallery = ({ data, doFetch, isError, isLoading }) => {
  const { items } = data;
  return (
    <>
      {isError && <Error />}
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
                  />
                );
              })}
            </StyledGalleryGrid>
          )}
          <GalleryNavigation data={data} doFetch={doFetch} />
        </>
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
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.shape({}),
};

export default Gallery;
