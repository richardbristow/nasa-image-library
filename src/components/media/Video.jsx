/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import selectLink from '../../utils/selectLink';

const StyledVideo = styled.video`
  min-height: 80%;
  margin: 0 auto;
  max-width: 100%;
`;

const Video = ({ data, mediaType, onMediaLoad, nasaId }) => (
  <StyledVideo
    controls
    crossOrigin="anonymous"
    preload="metadata"
    poster={selectLink(mediaType, data).vidThumb}
    onLoadedMetadata={(event) => onMediaLoad(event, mediaType)}
  >
    <source src={selectLink(mediaType, data).vidHref} />
    {selectLink(mediaType, data).subsHref.map((sub) => (
      <track key={nasaId} src={sub} kind="subtitles" />
    ))}
    Please use a more modern browser to play this video.
  </StyledVideo>
);

Video.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  mediaType: PropTypes.string.isRequired,
  onMediaLoad: PropTypes.func.isRequired,
  nasaId: PropTypes.string.isRequired,
};

export default Video;
