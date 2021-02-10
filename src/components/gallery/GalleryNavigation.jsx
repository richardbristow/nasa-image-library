import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

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

const StyledNavigationButton = styled.button`
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.grey};
  border: 2px solid ${({ theme }) => theme.lightGrey};
  font-size: 22px;
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.ghostWhite};
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 6px;
  height: 60px;
  width: 150px;

  &:hover {
    background-color: ${({ theme }) => theme.lightGrey};
    color: ${({ theme }) => theme.grey};
    border: 2px solid ${({ theme }) => theme.grey};
  }

  @media screen and (max-width: 700px) {
    font-size: 14px;
    padding: 10px 18px;
  }
`;

const GalleryNavigation = ({ data, doFetch }) => {
  const { metadata: { total_hits: totalHits } = {}, links: pageLinks } = data;

  return (
    <StyledGalleryNavigation>
      {pageLinks &&
        pageLinks.map((link) => (
          <StyledNavigationButton
            key={link.rel}
            onClick={() => doFetch(link.href)}
          >
            {link.prompt}
          </StyledNavigationButton>
        ))}
      {totalHits >= 0 && (
        <StyledTotalHits>
          Found <strong>{totalHits}</strong> results.
        </StyledTotalHits>
      )}
    </StyledGalleryNavigation>
  );
};

GalleryNavigation.propTypes = {
  data: PropTypes.shape({
    links: PropTypes.arrayOf(PropTypes.object),
    metadata: PropTypes.shape({
      total_hits: PropTypes.number,
    }),
  }).isRequired,
  doFetch: PropTypes.func.isRequired,
};

export default GalleryNavigation;
