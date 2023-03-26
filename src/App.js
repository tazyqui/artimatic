import './App.css';
import React, { useState } from 'react';
import AsemicScript from './sketches/asemic_script';
import Footer from  './components/Footer';
import Header from './components/Header';
import Inputs from './components/Inputs';
import Outputs from './components/Outputs';
import SideBar from './animation/SideBar';
import Download from './components/Download';
import P5InstanceContext from './P5InstanceContext';

function App() {
  const [p5Instance, setP5Instance] = useState(null);

  return (
    <P5InstanceContext.Provider value={p5Instance}>
      <div className="App">
      <div className='Header'>
        <SideBar />
        <Download />
      </div>

      {/* <div className="Header">
        <Header /> 
      </div> */}

      <div className="Script">
        <AsemicScript setP5Instance={setP5Instance}/>
      </div>

      {/* <div className = "Parameters">
        <Inputs />
      </div>

      <div className="Footer">
        <Footer />
      </div> */}
      </div>
    </P5InstanceContext.Provider>
  );
}


export default App;
