import React, { useContext } from 'react';
import Button  from '../Button';
import { SideBarContext } from '../index';
import './style.scss';

const TopSection = () => {
  const { setIsShowSidebar } = useContext(SideBarContext);
  return (
    <div className="SideBar__TopSection">
      <div className='SideBar__TopSection__content'>
        <p>Artimatic</p>
      </div>
      <Button
        onClick={() => setIsShowSidebar(true)}
      />
    </div>
    
  );
};

export default TopSection;
