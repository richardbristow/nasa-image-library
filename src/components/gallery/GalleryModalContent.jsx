/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import useFetch from '../../hooks/useFetch';
import selectLink from '../../utils/selectLink';
import Error from '../shared/Error';

const StyledModalContent = styled.div`
  img {
    max-height: 100%;
    max-width: 60%;
  }
  video {
    width: 100%;
  }
  audio {
    width: 100%;
  }
  .modal-text-image {
    float: right;
    width: 38%;
  }
  .modal-text-video {
    display: block;
    padding-top: 20px;
  }
  .modal-text-audio {
    display: block;
    padding-top: 20px;
  }
`;

const GalleryModalContent = ({ clickedModalMetadata }) => {
  const {
    media_type: mediaType,
    title,
    description,
    nasa_id: nasaId,
  } = clickedModalMetadata;

  const [{ fetchedData, isLoading, isError }] = useFetch(
    `https://images-api.nasa.gov/asset/${encodeURIComponent(nasaId)}`,
    {
      collection: { items: [] },
    },
  );

  const { collection: data } = fetchedData;
  console.log('modal', data);
  return (
    <StyledModalContent>
      {isError && <Error />}
      {!isLoading && mediaType === 'image' && data && (
        <img alt={title} src={selectLink(mediaType, data).imageHref} />
      )}

      {!isLoading && mediaType === 'video' && data && (
        <video
          controls
          poster={selectLink(mediaType, data).vidThumb}
          crossOrigin="anonymous"
          preload="metadata"
        >
          <source src={selectLink(mediaType, data).vidHref} />
          {selectLink(mediaType, data).subsHref.map((sub) => (
            <track key={nasaId} src={sub} kind="subtitles" />
          ))}
          Please use a more modern browser to play this video.
        </video>
      )}

      {!isLoading && mediaType === 'audio' && data && (
        <audio controls>
          <source
            src={selectLink(mediaType, data).audioHref.href}
            type="audio/mp4"
          />
          Please use a more modern browser to play this audio.
        </audio>
      )}
      <div className={`modal-text-${mediaType}`}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </StyledModalContent>
  );
};

GalleryModalContent.propTypes = {
  clickedModalMetadata: PropTypes.shape({
    description: PropTypes.string,
    media_type: PropTypes.string,
    nasa_id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default GalleryModalContent;
