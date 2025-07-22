import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import Button from './Button';

const FileUpload = ({ 
  label, 
  onUpload, 
  currentFile, 
  buttonText = 'Upload File',
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024 // 5MB
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = async (file) => {
    if (!file) return;

    if (file.size > maxSize) {
      alert('File size too large. Please select a file under 5MB.');
      return;
    }

    setUploading(true);
    try {
      // Simulate file upload - in real app, upload to cloud storage
      const url = URL.createObjectURL(file);
      onUpload(url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver 
            ? 'border-blue-500 bg-blue-900/20' 
            : 'border-gray-600 bg-gray-800'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {currentFile ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center">
              <img 
                src={currentFile} 
                alt="Preview" 
                className="h-20 w-20 object-cover rounded-lg"
              />
            </div>
            <div className="flex space-x-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('file-input').click()}
                disabled={uploading}
              >
                Change
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUpload('')}
                className="text-red-400 border-red-400 hover:bg-red-900/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload className="h-12 w-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-gray-300">Drop your file here, or</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('file-input').click()}
                disabled={uploading}
                className="mt-2"
              >
                {uploading ? 'Uploading...' : buttonText}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG up to 5MB
            </p>
          </div>
        )}
      </div>

      <input
        id="file-input"
        type="file"
        accept={accept}
        onChange={(e) => handleFileSelect(e.target.files[0])}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;