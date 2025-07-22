import React from 'react';

const Toggle = ({ label, name, checked, onChange, description }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors duration-200">
      <div className="flex-1">
        <label className="font-medium text-gray-900 cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
            checked ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          onClick={() => onChange({ target: { name, checked: !checked } })}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
              checked ? 'translate-x-6' : 'translate-x-0.5'
            } mt-0.5`}
          />
        </div>
      </div>
    </div>
  );
};

export default Toggle;