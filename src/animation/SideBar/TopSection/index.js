import React, { useContext } from 'react';
import Button  from '../Button';
import { SideBarContext } from '../index';
import './style.scss';
import logo from '../../../logo.png';

const TopSection = () => {
  const { setIsShowSidebar } = useContext(SideBarContext);
  return (
    <div className="SideBar__TopSection">
      <left><img src={logo} className="App-logo" style={{ width: '165px', height: 'auto', marginLeft: '20px' }} alt="logo" /> </left>
      <Button
        onClick={() => setIsShowSidebar(true)}
      />
    </div>
    
  );
};

export default TopSection;
