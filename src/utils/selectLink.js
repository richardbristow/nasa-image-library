const selectLink = (mediaType, assetData) => {
  const assetObj = {};
  if (mediaType.toLowerCase() === 'image') {
    // Get a better quality image
    assetObj.imageHref = assetData.items[0].href;
    assetData.items.forEach((img) => {
      if (img.href.endsWith('medium.jpg')) {
        assetObj.imageHref = img.href;
      } else if (
        img.href.endsWith('large.jpg') &&
        !assetObj.imageHref.endsWith('medium.jpg')
      ) {
        assetObj.imageHref = img.href;
      } else if (
        img.href.endsWith('orig.jpg') &&
        (!assetObj.imageHref.endsWith('large.jpg') ||
          !assetObj.imageHref.endsWith('medium.jpg'))
      ) {
        assetObj.imageHref = img.href;
      }
    });
  } else if (mediaType.toLowerCase() === 'video') {
    // Get the video link and video thumbnail to display
    assetObj.subsHref = [];
    const vidThumb = [];
    assetData.items.forEach((vid) => {
      if (vid.href.endsWith('mp4')) {
        if (vid.href.endsWith('medium.mp4')) {
          assetObj.vidHref = vid.href;
        } else if (vid.href.endsWith('large.mp4')) {
          assetObj.vidHref = vid.href;
        } else if (vid.href.endsWith('orig.mp4')) {
          assetObj.vidHref = vid.href;
        } else if (vid.href.endsWith('mobile.mp4')) {
          assetObj.vidHref = vid.href;
        } else if (vid.href.endsWith('small.mp4')) {
          assetObj.vidHref = vid.href;
        }
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
  return assetObj;
};

export default selectLink;
