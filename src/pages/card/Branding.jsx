import React from 'react';
import Input from '../../components/ui/Input.jsx';
import FileUpload from '../../components/ui/FileUpload.jsx';
const Branding = ({ cardData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Platform & Franchise Branding</h3>
      
      {/* Platform Branding */}
      <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-white">Platform/Owner Branding</h4>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="platformBranding"
              checked={cardData.platformBranding?.enabled || false}
              onChange={(e) => handleInputChange('platformBranding', 'enabled', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="platformBranding" className="text-sm text-gray-300">
              Enable Platform Branding
            </label>
          </div>
        </div>
        
        {cardData.platformBranding?.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Platform Name"
              value={cardData.platformBranding?.name || ''}
              onChange={(e) => handleInputChange('platformBranding', 'name', e.target.value)}
              placeholder="CardCraft"
              className="bg-gray-700 border-gray-600 text-white"
            />
            <FileUpload
              label="Platform Logo"
              onUpload={(url) => handleInputChange('platformBranding', 'logo', url)}
              currentFile={cardData.platformBranding?.logo}
              buttonText="Upload Logo"
            />
          </div>
        )}
      </div>

      {/* Franchise Branding */}
      <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
        <h4 className="text-md font-medium text-white mb-4">Franchise Branding</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Franchise Name"
            value={cardData.franchiseInfo?.name || ''}
            onChange={(e) => handleInputChange('franchiseInfo', 'name', e.target.value)}
            placeholder="Franchise name"
            className="bg-gray-700 border-gray-600 text-white"
          />
          <FileUpload
            label="Franchise Logo"
            onUpload={(url) => handleInputChange('franchiseInfo', 'logo', url)}
            currentFile={cardData.franchiseInfo?.logo}
            buttonText="Upload Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Branding;