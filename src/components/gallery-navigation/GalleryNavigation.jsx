import React from 'react';
import styled from 'styled-components/macro';

import NavigationButton from './NavigationButton';

const StyledGalleryNavigation = styled.div`
  margin: 0 auto;
  padding: 60px;
  div {
    text-align: center;
    margin-bottom: 20px;
  }
`;

const StyledTotalHits = styled.span`
  display: block;
  text-align: center;
  span {
    font-weight: bold;
  }
`;

const GalleryNavigation = ({ searchData, handlePageChange }) => {
  const { metadata, links } = searchData;
  return (
    <StyledGalleryNavigation>
      <div>
        {links && links.map(link => (
          <NavigationButton
            navType={link.rel.charAt(0).toUpperCase() + link.rel.slice(1)}
            handlePageChange={handlePageChange}
            url={link.href}
            key={link.rel}
          />
        ))}
      </div>
      <StyledTotalHits>
        Found&nbsp;
        <span>
          {metadata.total_hits}
        </span>
        &nbsp;results.
      </StyledTotalHits>
    </StyledGalleryNavigation>
  );
};

export default GalleryNavigation;
