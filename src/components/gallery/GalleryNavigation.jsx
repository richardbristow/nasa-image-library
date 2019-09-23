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
  background-color: ${({ theme }) => theme.grey};
  border: 2px solid ${({ theme }) => theme.lightGrey};
  font-size: 24px;
  padding: 18px 32px;
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.ghostWhite};
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 6px;

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
  const {
    metadata: { total_hits: totalHits },
    links: pageLinks,
  } = data.collection;

  return (
    <StyledGalleryNavigation>
      {pageLinks.map(link => (
        <StyledNavigationButton
          key={link.rel}
          onClick={() => doFetch(link.href)}
        >
          {link.prompt}
        </StyledNavigationButton>
      ))}
      {totalHits && (
        <StyledTotalHits>
          Found&nbsp;
          <span>{totalHits}</span>
          &nbsp;results.
        </StyledTotalHits>
      )}
    </StyledGalleryNavigation>
  );
};

GalleryNavigation.defaultProps = {
  data: {
    collection: {
      links: [],
      metadata: {
        total_hits: 0,
      },
    },
  },
};

GalleryNavigation.propTypes = {
  data: PropTypes.shape({
    collection: PropTypes.shape({
      links: PropTypes.array,
      metadata: PropTypes.object,
    }),
  }),
  doFetch: PropTypes.func.isRequired,
};

export default GalleryNavigation;
