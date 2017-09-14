import React from 'react';
import '../styles/css/GalleryModal.css';

function GalleryModal(props) {
  if (props.isModalOpen === false) {
    return null;
  }

  return (
    <div>
      <h1>This is the Modal</h1>
      <button onClick={props.closeModal}>Close</button>
    </div>
  );
}

export default GalleryModal;
