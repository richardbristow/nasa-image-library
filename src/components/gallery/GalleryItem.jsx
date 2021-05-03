import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Link, useLocation } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

const StyledGalleryItem = styled(Link)`
  position: relative;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  flex-grow: 1;
  margin: 0.4em;
  height: 200px;
  background-color: ${({ theme }) => theme.lightGrey};
  min-width: 200px;
  border-radius: 4px;
  &:hover {
    opacity: 0.7;
  }
  ${({ mediaType }) => mediaType === 'audio' && 'width: 200px;'}

  img {
    height: 200px;
    object-fit: cover;
    max-width: 100%;
    min-width: 100%;
    vertical-align: bottom;
    border-radius: 4px;
    ${({ mediaType }) => mediaType === 'video' && 'filter: brightness(70%);'}
  }

  .gallery-item-audio {
    display: flex;
    justify-content: center;
    height: 200px;
    width: 100%;
    background: ${({ theme }) => theme.grey};
    text-align: center;
    color: ${({ theme }) => theme.lightGrey};
    overflow: hidden;
    border-radius: 4px;

    div {
      align-self: center;
    }

    i {
      padding: 3%;
      font-size: 60px;
    }

    p {
      padding: 3%;
      font-size: 12px;
      line-height: 20px;
      overflow: hidden;
    }
  }
`;

const StyledFaPlay = styled(FaPlay)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 60px;
  color: ${({ theme }) => theme.ghostWhite};
`;

const GalleryItem = ({ itemData, imageThumbnail }) => {
  const { media_type: mediaType, title, nasa_id: nasaId } = itemData;
  const { href } = imageThumbnail;
  const location = useLocation();
  return (
    <StyledGalleryItem
      to={{
        pathname: `/asset/${nasaId}`,
        state: { background: location },
      }}
      $mediaType={mediaType}
    >
      {mediaType !== 'audio' ? (
        <>
          <img
            onError={(e) => {
              e.target.parentNode.style.display = 'none';
            }}
            src={href}
            alt={title}
          />
          {mediaType === 'video' && <StyledFaPlay />}
        </>
      ) : (
        <div className="gallery-item-audio">
          <div>
            <i className="fa fa-volume-up" aria-hidden="true" />
            <p>{title}</p>
          </div>
        </div>
      )}
    </StyledGalleryItem>
  );
};

GalleryItem.defaultProps = {
  imageThumbnail: { href: '#' },
};

GalleryItem.propTypes = {
  itemData: PropTypes.shape({
    media_type: PropTypes.string,
    title: PropTypes.string,
    nasa_id: PropTypes.string,
  }).isRequired,
  imageThumbnail: PropTypes.shape({
    href: PropTypes.string,
  }),
};

export default GalleryItem;
