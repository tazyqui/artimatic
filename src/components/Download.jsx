import React, { useContext } from "react";
import P5InstanceContext from '../P5InstanceContext';
import '../App.css';

const Download = () => {
  const p5Instance = useContext(P5InstanceContext);

  const handleDownload = () => {
    if (p5Instance) {
      console.log('Download button clicked');
      p5Instance.saveCanvas("canvas", "png");
    }
  };

  return (
    <center>
    <div className="download">
      <button className="download-button" onClick={handleDownload}>
      <i className="fas fa-download" style={{ marginRight: '5px' }}></i>
        Download Image
        </button>
    </div>
    </center>
  );
};

export default Download;