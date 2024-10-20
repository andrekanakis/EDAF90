import React, { useId } from 'react';

function Select({ label, onChange, value, options }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select onChange={onChange} value={value} className="form-select" id={id}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
