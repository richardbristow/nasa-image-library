import React, { Component } from 'react';
import styled from 'styled-components/macro';

import getData from '../../utils/getData';
import selectLink from '../../utils/selectLink';

const StyledModalContent = styled.div`
  img {
    max-height: 100%;
    max-width: 60%;
  };
  video {
    width: 100%;
  };
  audio {
    width: 100%;
  };
  .modal-text-image {
    float: right;
    width: 38%;
  };
  .modal-text-video {
    display: block;
    padding-top: 20px;
  };
  .modal-text-audio {
    display: block;
    padding-top: 20px;
  };
`;

class GalleryModalContent extends Component {
  constructor(props) {
    super(props);

    this.state = { errorFetching: null, modalData: null };
  }

  async componentDidMount() {
    const { clickedModalMetadata: { nasaId } } = this.props;
    const url = `https://images-api.nasa.gov/asset/${nasaId}`;
    const { errorFetching, data } = await getData(encodeURI(url));
    this.setState({ errorFetching, modalData: data });
  }

  render() {
    const { modalData } = this.state;
    const { clickedModalMetadata } = this.props;
    const { mediaType, title, description } = clickedModalMetadata;
    console.log(modalData && selectLink(mediaType, modalData));

    return (
      <StyledModalContent>
        {modalData && mediaType === 'image' && <img alt={title} src={(selectLink(mediaType, modalData)).imageHref} />}

        {modalData && mediaType === 'video'
          && (
          <video controls poster={(selectLink(mediaType, modalData)).vidThumb}>
            <source src={(selectLink(mediaType, modalData)).vidHref} />
            {(selectLink(mediaType, modalData)).subsHref.forEach(sub =>
              <track src={sub} kind="subtitles" />)}
            Please use a more modern browser to play this video.
          </video>)}

        {modalData && mediaType === 'audio'
          && (
            <audio controls>
              <source src={(selectLink(mediaType, modalData)).audioHref.href} type="audio/mp4" />
              Please use a more modern browser to play this audio.
            </audio>
          )
        }
        <div className={`modal-text-${mediaType}`}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </StyledModalContent>
    );
  }
}

export default GalleryModalContent;
