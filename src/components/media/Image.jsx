import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import selectLink from '../../utils/selectLink';

const StyledImage = styled.img`
  min-height: 80%;
  margin: 0 auto;
  max-width: 100%;
`;

const Image = ({ data, title, mediaType, onMediaLoad }) => (
  <StyledImage
    alt={title}
    src={selectLink(mediaType, data).imageHref}
    onLoad={(event) => onMediaLoad(event, mediaType)}
  />
);

Image.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  title: PropTypes.string.isRequired,
  mediaType: PropTypes.string.isRequired,
  onMediaLoad: PropTypes.func.isRequired,
};

export default Image;
