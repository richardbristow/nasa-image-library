import React, { Component } from 'react';
import '../../styles/css/GalleryModal.css';

// import Loading from './Loading';

class GalleryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      assetData: {},
      err: false,
    };

    this.getModalContent = this.getModalContent.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    console.log('i mounted');
  }

  // Perfom another api call to get the info for the modal
  async getModalContent() {
    // Polyfill for object endswith. IE compatibilty
    if (!String.prototype.endsWith) {
      /* eslint-disable */
      String.prototype.endsWith = (searchStr, Position) => {
        // This works much better than >= because
        // it compensates for NaN:
        if (!(Position < this.length)) {
          Position = this.length;
        } else {
          Position |= 0; // round position
        }
        return this.substr(Position - searchStr.length, searchStr.length) === searchStr;
      };
      /* eslint-enable */
    }

    const { clickedModalMetadata } = this.props;
    const {
      mediaType, title, description, nasaId,
    } = clickedModalMetadata;
    let metaUrl = `https://images-api.nasa.gov/asset/${nasaId}`;
    metaUrl = metaUrl.replace(/ /g, '%20');

    // fetch the data to display in the modal
    let err = false;
    let assetData = {};
    try {
      const response = await fetch(metaUrl);
      assetData = await response.json();
      console.log('assetData', assetData);
    } catch (e) {
      console.log('this another errro');
      err = true;
    }

    const assetObj = {};
    if (!err) {
      assetData = assetData.collection;
      if (mediaType.toLowerCase() === 'image') {
        // Get a better quality image
        assetObj.imageHref = assetData.items[0].href;
        assetData.items.forEach((img) => {
          if (img.href.endsWith('medium.jpg')) {
            assetObj.imageHref = img.href;
          } else if (img.href.endsWith('large.jpg') && !(assetObj.imageHref.endsWith('medium.jpg'))) {
            assetObj.imageHref = img.href;
          } else if (img.href.endsWith('orig.jpg') && (!(assetObj.imageHref.endsWith('large.jpg')) || !(assetObj.imageHref.endsWith('medium.jpg')))) {
            assetObj.imageHref = img.href;
          }
        });
      } else if (mediaType.toLowerCase() === 'video') {
        // Get the video link and video thumbnail to display
        assetObj.subsHref = [];
        const vidThumb = [];
        assetData.items.forEach((vid) => {
          if (vid.href.endsWith('orig.mp4')) {
            assetObj.vidHref = vid.href;
          } else if (vid.href.endsWith('.png') || vid.href.endsWith('.jpg')) {
            vidThumb.push(vid.href);
          } else if (vid.href.endsWith('.srt') || vid.href.endsWith('.vtt')) {
            assetObj.subsHref.push(vid.href);
          }
        });
        assetObj.vidThumb = vidThumb[Math.floor(vidThumb.length / 2)];
      } else {
        // get the audio link
        assetObj.audioHref = assetData.items.find((aud) => {
          if (aud.href.endsWith('128k.mp3') || aud.href.endsWith('128k.m4a')) {
            return aud.href;
          }
          return null;
        });
      }
    }
    this.setState({
      err,
      loading: false,
      assetData: assetObj,
    });
  }


  // when close button or backdrop is clicked reset state,
  closeModal(e) {
    if (e.target.className === 'modal-wrapper' || e.target.className === 'modal-close-button') {
      this.props.closeModal();
      this.setState({
        loading: true,
        assetData: {},
      });
    }
  }


  // Creates the modal
  renderModal() {
    const { loading } = this.state;
    const { clickedModalMetadata } = this.props;
    const {
      mediaType, title, description, nasaId,
    } = clickedModalMetadata;
    let modalContent;
    if (loading) {
      // the modal is in a loading state, render loading spinner
      modalContent = (
        <div className="modalLoading">
          {/* <Loading /> */}
        </div>
      );
      // fetch the data needed
      this.getModalContent();
    } else {
      const data = this.state.assetData;
      // display the modal
      modalContent = (
        <div role="presentation" className="modal-wrapper" onClick={e => this.closeModal(e)}>
          <div className="modal-content">
            <span
              role="button"
              tabIndex={0}
              className="modal-close-button"
              onClick={this.closeModal}
            >
              &times;
            </span>
            {/* Create the image modal */}
            {mediaType === 'image' && <img alt={title} src={data.imageHref} />}

            {/* Create the video modal element */}
            {mediaType === 'video'
              ? <video controls poster={data.vidThumb}>
                  <source src={data.vidHref} />
                  {data.subsHref.forEach(sub =>
                    <track src={sub} kind="subtitles" />,
                  )}
                  Please use a more modern browser to play this video.
                </video> : null}

            {/* Create the audio modal */}
            {mediaType === 'audio'
              ? <audio controls>
                  <source src={data.audioHref.href} type="audio/mp4" />
                  Please use a more modern browser to play this audio.
                </audio> : null
            }
            {/* Render the description for the media item */}
            <div className={`modal-text-${mediaType}`}>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
      );
    }
    return modalContent;
  }


  render() {
    if (this.state.err) {
        return (
          <div className="fetch-errors-modal">
            <p>Oops!</p>
            <p>Something went wrong trying to fetch your data.</p>
          </div>);
      }
      return this.renderModal();
  }
}

export default GalleryModal;
