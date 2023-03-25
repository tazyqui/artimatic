/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import Button from '../Button';
import Inputs from '../../../components/Inputs';
import { SideBarContext } from '../index';
import './style.scss';


const RightSection = () => {
  const { isShowSidebar, setIsShowSidebar } = useContext(SideBarContext);
  return (
    <div className={`SideBar__Section SideBar__Section--${isShowSidebar ? 'show' : 'hide'}`}>
      <div className="SideBar__Section__topWrapper">
        <Button
          onClick={() => setIsShowSidebar(false)}
        />
      </div>
        <Inputs />
    </div>
  );
};

export default RightSection;
