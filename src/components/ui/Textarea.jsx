import React, { useState } from 'react';

const Textarea = ({ 
  label, 
  name, 
  value, 
  onChange, 
  required = false, 
  placeholder = '',
  rows = 4,
  className = '',
  error = '',
  minLength,
  ...props 
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder={focused ? placeholder : ''}
        rows={rows}
        className={`w-full px-4 pt-6 pb-2 bg-white border-2 rounded-xl transition-all duration-200 focus:outline-none resize-none ${
          error 
            ? 'border-red-500 focus:border-red-500' 
            : focused || hasValue
            ? 'border-blue-500 focus:border-blue-500 shadow-lg shadow-blue-500/10'
            : 'border-gray-200 hover:border-gray-300'
        }`}
        {...props}
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          focused || hasValue
            ? 'top-2 text-xs font-medium'
            : 'top-4 text-gray-500'
        } ${
          error 
            ? 'text-red-500' 
            : focused || hasValue 
            ? 'text-blue-500' 
            : 'text-gray-500'
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {minLength && (
        <div className="mt-1 text-sm text-gray-500">
          {value.length}/{minLength} characters minimum
        </div>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Textarea;