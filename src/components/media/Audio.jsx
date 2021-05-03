/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import selectLink from '../../utils/selectLink';

const StyledAudio = styled.div`
  audio {
    width: 100%;
  }
`;

const Audio = ({ setIsMediaLoading, mediaType, data }) => (
  <StyledAudio>
    <audio controls onCanPlay={() => setIsMediaLoading(false)}>
      <source
        src={selectLink(mediaType, data).audioHref.href}
        type="audio/mp4"
      />
      Please use a more modern browser to play this audio.
    </audio>
  </StyledAudio>
);

Audio.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  mediaType: PropTypes.string.isRequired,
  setIsMediaLoading: PropTypes.func.isRequired,
};

export default Audio;
