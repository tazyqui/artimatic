import './App.css';
import React, { useState } from 'react';
import AsemicScript from './sketches/asemic_script';
import Footer from  './components/Footer';
import Header from './components/Header';
import Inputs from './components/Inputs';
import Outputs from './components/Outputs';
import SideBar from './animation/SideBar';
import Download from './components/Download';
import Regenerate from "./components/Regenerate";
import P5InstanceContext from './P5InstanceContext';


function App() {
  const [p5Instance, setP5Instance] = useState(null);
  const [regenerate, setRegenerate] = useState(0);

  const handleRegenerate = () => {
    setRegenerate((prevRegenerate) => prevRegenerate + 1);
  };

  return (
    <P5InstanceContext.Provider value={p5Instance}>
      <div className="App">
      <div className='Header'>
        <SideBar />
        <div className="actions-container">
        <Download p5Instance={p5Instance} />
        <Regenerate onRegenerate={handleRegenerate} />
        </div>
      </div>

      {/* <div className="Header">
        <Header /> 
      </div> */}

      <div className="Script">
        <AsemicScript setP5Instance={setP5Instance} regenerate={regenerate}/>
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
