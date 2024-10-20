import React, { useId } from 'react';

function Select({ label, onChange, value, options, required }) {
  const id = useId();

  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        required={required}
        onChange={onChange}
        value={value}
        className="form-select"
        id={id}
      >
        <option value="">Gör ditt val</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;
