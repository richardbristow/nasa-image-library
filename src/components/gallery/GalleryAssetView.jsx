/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import useFetch from '../../hooks/useFetch';
import Loading from '../shared/Loading';
import Error from '../shared/Error';
import selectLink from '../../utils/selectLink';

// const StyledModalContent = styled.div`
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
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

const StyledGalleryAssetView = styled.div`
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
    ${({ isMediaLoading }) => isMediaLoading && 'display: none;'}
  }

  img,
  video {
    min-height: 80%;
    margin: 0 auto;
    max-width: 100%;
  }

  audio {
    width: 100%;
  }

  #modal-text {
    display: flex;
    flex-direction: column;
    min-height: 20%;
    p {
      overflow: scroll;
    }
  }
`;

const GalleryAssetView = ({ inModal }) => {
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [mediaDimensions, setMediaDimensions] = useState(null);
  const { nasaId } = useParams();

  const [{ fetchedData, isLoading, isError }] = useFetch(
    `https://images-api.nasa.gov/asset/${nasaId}`,
    {
      metadataResponseData: {},
      responseData: { collection: { items: [] } },
    },
    true,
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
          ? target.naturalWidth / target.naturalHeight <= 1.4
          : target.videoHeight >= target.videoWidth,
    });
    setIsMediaLoading(false);
  };

  const {
    metadataResponseData: {
      'AVAIL:MediaType': mediaType,
      'AVAIL:Description': description,
      'AVAIL:Title': title,
    },
    responseData: { collection: data },
  } = fetchedData;

  return (
    <>
      <StyledGalleryAssetView
        isMediaLoading={isMediaLoading}
        mediaDimensions={mediaDimensions}
        onClick={(event) => event.stopPropagation()}
      >
        {isError && <Error />}
        {isMediaLoading && !mediaDimensions && <Loading modal={inModal} />}
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
            <audio controls onCanPlay={() => setIsMediaLoading(false)}>
              <source
                src={selectLink(mediaType, data).audioHref.href}
                type="audio/mp4"
              />
              Please use a more modern browser to play this audio.
            </audio>
          </div>
        )}
        {!isMediaLoading && (
          <div id="modal-text">
            <h2>{title}</h2>
            <p className={`modal-text-${mediaType}`}>{description}</p>
          </div>
        )}
      </StyledGalleryAssetView>
    </>
  );
};

GalleryAssetView.propTypes = {
  inModal: PropTypes.bool.isRequired,
};

export default GalleryAssetView;
