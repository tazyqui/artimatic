import React, { useContext } from 'react';
import Button  from '../Button';
import { SideBarContext } from '../index';
import './style.scss';
import logo from '../../../logo.png';

const TopSection = () => {
  const { setIsShowSidebar } = useContext(SideBarContext);
  return (
    <div className="SideBar__TopSection">
      <img src={logo} className="App-logo" style={{ width: '165px', height: 'auto', marginLeft: '20px' }} alt="logo" /> 
      
      <div className="Button2">
      Find Out How It Works
      <i className="fa-sharp fa-solid fa-circle-info fa-bounce fa-lg" style={{ marginLeft: '8px', color:'#00308F' }}></i>
      </div>

      <Button
        onClick={() => setIsShowSidebar(true)}
      />
    </div>
    
  );
};

export default TopSection;