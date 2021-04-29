/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import useFetch from '../../hooks/useFetch';
import selectLink from '../../utils/selectLink';
import Error from '../shared/Error';
import Loading from '../shared/Loading';

// const StyledModalContent = styled.div`
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   img,
//   video,
//   audio {
//     ${({ isModalContentLoading }) => isModalContentLoading && 'display: none;'}
//   }
//   img {
//     max-height: 100%;
//     max-width: 60%;
//   }
//   video {
//     max-width: 100%;
//     height: auto;
//   }
//   audio {
//     width: 100%;
//   }
//   .modal-text-image {
//     float: right;
//     width: 38%;
//   }
//   .modal-text-video {
//     overflow: auto;
//     margin: 0;
//   }
//   .modal-text-audio {
//     overflow: auto;
//     margin: 0;
//   }
// `;

const StyledModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.lightGrey};
  border: 1px solid ${({ theme }) => theme.grey};
  padding: 15px;
  max-height: 80%;
  max-width: 80%;
  border-radius: 6px;

  img,
  video,
  audio {
    ${({ isModalContentLoading }) => isModalContentLoading && 'display: none;'}
  }

  img {
    min-height: 80%;
    margin: 0 auto;
    max-width: 100%;
  }

  #modal-text {
    min-height: 20%;
  }
`;

const GalleryModalContent = ({ clickedModalMetadata }) => {
  const [isModalContentLoading, setIsModalContentLoading] = useState(true);
  const [mediaDimensions, setMediaDimensions] = useState(null);
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

  const onMediaLoad = ({ target }, type) => {
    setMediaDimensions({
      naturalWidth: type === 'image' ? target.naturalWidth : target.videoWidth,
      naturalHeight:
        type === 'image' ? target.naturalHeight : target.videoHeight,
      width: type === 'image' ? target.width : target.videoWidth,
      height: type === 'image' ? target.height : target.videoHeight,
      isPortrait:
        type === 'image'
          ? target.naturalHeight >= target.naturalWidth
          : target.videoHeight >= target.videoWidth,
    });
    setIsModalContentLoading(false);
  };

  const { collection: data } = fetchedData;

  return (
    <StyledModalContentWrapper
      isModalContentLoading={isModalContentLoading}
      mediaDimensions={mediaDimensions}
      onClick={(event) => event.stopPropagation()}
    >
      {isError && <Error />}
      {isModalContentLoading && !mediaDimensions && <Loading modal />}
      {!isLoading && mediaType === 'image' && data && (
        <img
          alt={title}
          src={selectLink(mediaType, data).imageHref}
          onLoad={(event) => onMediaLoad(event, mediaType)}
        />
      )}
      {!isLoading && mediaType === 'video' && data && (
        <video
          controls
          crossOrigin="anonymous"
          preload="metadata"
          onLoadedMetadata={(event) => onMediaLoad(event, mediaType)}
        >
          <source src={selectLink(mediaType, data).vidHref} />
          {selectLink(mediaType, data).subsHref.map((sub) => (
            <track key={nasaId} src={sub} kind="subtitles" />
          ))}
          Please use a more modern browser to play this video.
        </video>
      )}
      {!isLoading && mediaType === 'audio' && data && (
        <div>
          <audio controls onCanPlay={() => setIsModalContentLoading(false)}>
            <source
              src={selectLink(mediaType, data).audioHref.href}
              type="audio/mp4"
            />
            Please use a more modern browser to play this audio.
          </audio>
        </div>
      )}
      {!isModalContentLoading && (
        <div id="modal-text">
          <h2>{title}</h2>
          <p className={`modal-text-${mediaType}`}>{description}</p>
        </div>
      )}
    </StyledModalContentWrapper>
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
