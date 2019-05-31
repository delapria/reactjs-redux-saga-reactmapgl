import React from 'react';
import './styles.css';

const ImageZoom = () => (
  <div className="w3-container">
    <div id="modal01" className="w3-modal" onClick="this.style.display='none'">
      <span className="w3-button w3-hover-red w3-xlarge w3-display-topright">&times;</span>
      <div className="w3-modal-content w3-animate-zoom">
        <img src="" style="width:100%" />
      </div>
    </div>
  </div>
);

export default ImageZoom;
