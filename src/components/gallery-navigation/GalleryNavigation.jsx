import React from 'react';
import PropTypes from 'prop-types';
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

const GalleryNavigation = ({ searchData, handleSearch }) => {
  const { metadata, links } = searchData;
  return (
    <StyledGalleryNavigation>
      <div>
        {links && links.map(link => (
          <NavigationButton
            navType={link.rel.charAt(0).toUpperCase() + link.rel.slice(1)}
            handleSearch={handleSearch}
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

GalleryNavigation.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  searchData: PropTypes.shape({
    href: PropTypes.string,
    items: PropTypes.array,
    links: PropTypes.array,
    metadata: PropTypes.object,
    version: PropTypes.string,
  }).isRequired,
};

export default GalleryNavigation;
