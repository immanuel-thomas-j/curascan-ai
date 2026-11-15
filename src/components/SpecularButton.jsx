import React from 'react';
import './SpecularButton.css';

const SpecularButton = ({
  children = 'Get Started',
  size = 'lg',
  radius = 999,
  textColor = '#ffffff',
  baseColor = '#2563eb',
  disabled = false,
  onClick,
  className = '',
  type = 'button'
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`specular-button specular-button--${size}${className ? ` ${className}` : ''}`}
      style={{
        '--sb-radius': `${radius}px`,
        '--sb-bg': baseColor || '#2563eb',
        '--sb-text-color': textColor
      }}
    >
      <span className="specular-button__label">{children}</span>
    </button>
  );
};

export default SpecularButton;
