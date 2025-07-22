import React, { useState } from 'react';
import { Palette } from 'lucide-react';

const ColorPicker = ({
  label,
  value,
  onChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const presetColors = [
    '#3B82F6', '#1E40AF', '#7C3AED', '#DB2777',
    '#DC2626', '#EA580C', '#D97706', '#65A30D',
    '#059669', '#0891B2', '#6366F1', '#8B5CF6',
    '#EC4899', '#F59E0B', '#10B981', '#06B6D4'
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 p-3 border border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-colors"
        >
          <div
            className="w-6 h-6 rounded border border-gray-300"
            style={{ backgroundColor: value }}
          />
          <span className="text-sm text-gray-700">{value}</span>
          <Palette className="h-4 w-4 text-gray-400 ml-auto" />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 w-64">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Custom Color
                </label>
                <input
                  type="color"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Preset Colors
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {presetColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        onChange(color);
                        setIsOpen(false);
                      }}
                      className={`w-6 h-6 rounded border-2 transition-all ${
                        value === color ? 'border-gray-800 scale-110' : 'border-gray-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ColorPicker;