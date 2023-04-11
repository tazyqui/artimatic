import React, { useContext } from 'react';
import Button  from '../Button';
import { SideBarContext } from '../index';
import './style.scss';
import logo from '../../../logo.png';
import { useLocation } from 'react-router-dom';

const TopSection = () => {
  const { setIsShowSidebar } = useContext(SideBarContext);
  const location = useLocation();
  return (
    <div className="SideBar__TopSection">
      <a href='/'>
        <img src={logo} className="App-logo" style={{ width: '165px', height: 'auto', marginLeft: '20px' }} alt="logo" /> 
      </a>
      <a href='/sketch'>
        <div className='Sketch_button'>Sketch</div>
      </a>
      {location.pathname === '/sketch' && (
        <div className="Button2">
        Find Out How It Works
        <i className="fa-sharp fa-solid fa-circle-info fa-bounce fa-lg" style={{ marginLeft: '8px', color:'#00308F' }}></i>
        </div>
      )}
      {location.pathname === '/sketch' && (
        <Button
          onClick={() => setIsShowSidebar(true)}
        />
      )}
    </div>
    
  );
};

export default TopSection;