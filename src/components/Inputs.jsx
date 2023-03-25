import React, { useEffect, useRef } from "react";
import p5 from "p5";

const Inputs = () => {
  const sliderRef1 = useRef(null);
  const valueRef1 = useRef(null);

  const sliderRef2 = useRef(null);
  const valueRef2 = useRef(null);

  const sliderRef3 = useRef(null);
  const valueRef3 = useRef(null);

  const checkboxRef = useRef(null);
  
  const DropdownRef = useRef(null);

  useEffect(() => {
    const sketchSlider = (p) => {
      let slider1;
      let slider2;
      let slider3;

      p.setup = () => {
        slider1 = p.createSlider(0, 255, 50);
        slider1.parent(sliderRef1.current);
        slider1.style("100%", "80px");

        slider2 = p.createSlider(0, 255, 50);
        slider2.parent(sliderRef2.current);
        slider2.style("100%", "80px");

        slider3 = p.createSlider(0, 255, 50);
        slider3.parent(sliderRef3.current);
        slider3.style("100%", "80px");
      };

      p.draw = () => {
        valueRef1.current.innerHTML = `Slider Value: ${slider1.value()}`;
        valueRef2.current.innerHTML = `Slider Value: ${slider2.value()}`;
        valueRef3.current.innerHTML = `Slider Value: ${slider3.value()}`;
      };
    };

    const sketchCheckbox = (p) => {
      let checkbox;

      p.setup = () => {
        checkbox = p.createCheckbox("Checkbox Label", false);
        checkbox.parent(checkboxRef.current);
      };

      p.draw = () => {
        const checkboxValue = checkbox.checked();
        console.log(checkboxValue);
      };
    };

    const sketchDropdown = (p) => {
      let select;

      p.setup = () => {
        select = p.createSelect();
        select.option("Option 1");
        select.option("Option 2");
        select.option("Option 3");
        select.parent(DropdownRef.current);
      };

      p.draw = () => {
        const selectedOption = select.value();
        console.log(selectedOption);
      };
    };

    new p5(sketchSlider);
    new p5(sketchCheckbox);
    new p5(sketchDropdown);
  }, []);

  return (
    <div className="inputs">
      <h2 className="inputs__title">Inputs</h2>

      <div className="slider">
        <h5 className="header-spacing">Input 1</h5>
        <div ref={sliderRef1}></div>
        <div ref={valueRef1}></div>
      </div>

      <div className="slider">
        <h5 className="header-spacing">Input 2</h5>
        <div ref={sliderRef2}></div>
        <div ref={valueRef2}></div>
      </div>

      <div className="slider">
        <h5 className="header-spacing">Input 3</h5>
        <div ref={sliderRef3}></div>
        <div ref={valueRef3}></div>
      </div>

      <div className="checkbox">
        <h5 className="header-spacing">Input 4</h5>
        <div ref={checkboxRef}></div>
      </div>

      <div className="checkbox">
        <h5 className="header-spacing">Input 5</h5>
        <div ref={DropdownRef}></div>
      </div>
    </div>
  );
};

export default Inputs;