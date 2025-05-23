import React, { useState, useRef, useEffect } from "react";
import './CustomDropdown.css';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = options.find(opt => opt.value === value);

  return (
    <div className="custom-dropdown" ref={ref}>
      <button className="dropdown-btn" onClick={() => setOpen(o => !o)}>
        {selected ? selected.label : options[0].label}
        <span className={open ? 'arrow up' : 'arrow'} />
      </button>
      {open && (
        <div className="dropdown-menu">
          {options.map(opt => (
            <div
              key={opt.value}
              className={"dropdown-item" + (opt.value === value ? " selected" : "")}
              onClick={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown; 