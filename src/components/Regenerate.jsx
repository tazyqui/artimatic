import React from 'react';
import '../App.css';
import P5InstanceContext from '../P5InstanceContext';


const Regenerate = ({ onRegenerate }) => {
  return (
    <button className="download-button" onClick={onRegenerate} style={{ margin: '10px' }}>
     <i className="fas fa-sync-alt" style={{ marginRight: '5px' }}></i>
      Regenerate
    </button>
  );
};

export default Regenerate;