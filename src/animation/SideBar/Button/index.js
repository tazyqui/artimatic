import React from 'react';
import './style.scss';

const Button = ({ onClick }) => {
  return (
    <div
      className="Button"
      role="button"
      onClick={onClick}
    >
      <i></i>
      <i></i>
      <i></i>
    </div>
  );
};

export default Button;
