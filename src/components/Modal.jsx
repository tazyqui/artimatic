import React from 'react';
import '../Modal.css';
import tour from '../tour.mp4';

const Modal = ({ onClose, title, text }) => {
  return (
    <div className="Modal__Overlay">
      <div className="Modal__Content">
        <button className="Modal__CloseButton" onClick={onClose}>
          <span aria-hidden="true">&times;</span>
        </button>
        <h2>{title}</h2>
        <p>{text}</p>
        <video src={tour} loop controls style={{ maxWidth: '90%', maxHeight: '70vh', marginTop: '20px' }}></video>
      </div>
    </div>
  );
};

export default Modal;
