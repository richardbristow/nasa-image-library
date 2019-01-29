import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import NavigationButton from './NavigationButton';

const StyledGalleryNavigation = styled.div`
  margin: 0 auto;
  padding: 60px;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledTotalHits = styled.span`
  display: block;
  text-align: center;
  span {
    font-weight: bold;
  }
`;

const GalleryNavigation = ({ totalHits, pageLinks, handleSearch }) => (
  <StyledGalleryNavigation>
    {pageLinks.map(link => (
      <NavigationButton
        navType={link.rel.charAt(0).toUpperCase() + link.rel.slice(1)}
        handleSearch={handleSearch}
        url={link.href}
        key={link.rel}
      />
    ))}
    {totalHits !== null && (
      <StyledTotalHits>
        Found&nbsp;
        <span>{totalHits}</span>
        &nbsp;results.
      </StyledTotalHits>
    )}
  </StyledGalleryNavigation>
);


GalleryNavigation.defaultProps = {
  totalHits: 0,
  pageLinks: [],
};

GalleryNavigation.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  totalHits: PropTypes.number,
  pageLinks: PropTypes.arrayOf(PropTypes.object),
};

export default GalleryNavigation;
