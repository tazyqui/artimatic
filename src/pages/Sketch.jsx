import P5InstanceContext from "../P5InstanceContext";  
import AsemicScript from "../sketches/asemic_script";
import Download from "../components/Download";
import Regenerate from "../components/Regenerate";
import React, { useState } from "react";

  
  const About = () => {
    const [p5Instance, setP5Instance] = useState(null);
    const [regenerate, setRegenerate] = useState(0);

    const handleRegenerate = () => {
        setRegenerate((prevRegenerate) => prevRegenerate + 1);
    };

    return (
        <P5InstanceContext.Provider value={p5Instance}>
            <div className="App">
                <div className='Header'>
                    <div className="actions-container">
                    <Download p5Instance={p5Instance} />
                    <Regenerate onRegenerate={handleRegenerate} />
                    </div>
                </div>

                <div className="Script">
                    <AsemicScript setP5Instance={setP5Instance} regenerate={regenerate}/>
                </div>

            </div>
        </P5InstanceContext.Provider>
    );
};

export default About;