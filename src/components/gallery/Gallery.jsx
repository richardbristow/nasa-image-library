import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useLocation } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
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

const Gallery = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultSearchUrl =
    'https://images-api.nasa.gov/search?q=iss&media_type=image';

  const [{ fetchedData, isLoading, isError }, doFetch] = useFetch(
    queryParams.toString() === ''
      ? defaultSearchUrl
      : `https://images-api.nasa.gov/search?${queryParams.toString()}`,
    {
      collection: { items: [] },
    },
  );

  useEffect(() => {
    if (queryParams.toString() !== '') {
      doFetch(`https://images-api.nasa.gov/search?${queryParams.toString()}`);
    } else {
      doFetch(defaultSearchUrl);
    }
  }, [location]);

  const { collection: data } = fetchedData;
  const { items } = data;

  return (
    <>
      {isError && <Error error={isError} />}
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
          <GalleryNavigation data={data} />
        </>
      )}
    </>
  );
};

export default Gallery;
