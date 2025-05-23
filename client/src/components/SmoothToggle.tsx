import React from "react";
import './SmoothToggle.css';

interface SmoothToggleProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

const SmoothToggle: React.FC<SmoothToggleProps> = ({ options, value, onChange }) => {
  return (
    <div className="smooth-toggle">
      {options.map((option) => (
        <button
          key={option.value}
          className={value === option.value ? 'active' : ''}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
      <div className="toggle-bg" style={{ left: value === options[0].value ? 0 : '50%' }} />
    </div>
  );
};

export default SmoothToggle; 