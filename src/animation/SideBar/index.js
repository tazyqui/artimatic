import React, { useState } from 'react';
import TopSection from './TopSection';
import RightSection from './RightSection';

import './style.scss';

export const SideBarContext = React.createContext({})

const SideBar = () => {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  return (
    <SideBarContext.Provider
      value={{ isShowSidebar, setIsShowSidebar }}
    >
      <div className="SideBar__container">
        <div
          className={`SideBar__container__overlay SideBar__container__overlay--${isShowSidebar ? 'show' : 'hide'}`}
          role="button"
          //onClick={() => setIsShowSidebar(false)}
        ></div>
        <TopSection />      
        <RightSection />
      </div>
    </SideBarContext.Provider>
  );
};

export default SideBar;
