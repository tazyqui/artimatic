import React, { useContext, useState } from 'react';
import { SideBarContext } from '../index';
import './style.scss';
import logo from '../../../logo.png';
import { useLocation } from 'react-router-dom';
import Modal from '../../../components/Modal';

const TopSection = () => {
  const { setIsShowSidebar } = useContext(SideBarContext);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="SideBar__TopSection">
      <a href='/'>
        <img src={logo} className="App-logo" style={{ width: '165px', height: 'auto', marginLeft: '20px' }} alt="logo" /> 
      </a>
      <div className="right-container">
        {(location.pathname === '/sketch' || location.pathname === '/') && (
          <div className="Button2" onClick={openModal}>
            <span className="find-out-link">Find Out How It Works</span>
            <i className="fa-sharp fa-solid fa-circle-info fa-bounce fa-lg" style={{ marginLeft: '10px', color:'#00308F' }}></i>
          </div>
        )}
        {location.pathname === '/' && (
          <a href='/sketch' className="align-right">
            <div className='Sketch_button download-button'>Visit Sketch</div>
          </a>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal} title="How It Works" text="Please watch this quick video on how the application functions.">
          <video src="/space3.mp4" autoPlay muted loop style={{ maxWidth: '100%', maxHeight: '70vh', marginTop: '20px' }}></video>
        </Modal>
      )}
    </div>
  );
};

export default TopSection;
