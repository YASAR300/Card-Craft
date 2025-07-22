import React from 'react';
import Input from '../../components/ui/Input.jsx';
import ColorPicker from '../../components/ui/ColorPicker.jsx';
const EliteFeatures = ({ cardData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Elite Features</h3>
      
      {/* VIP Pass */}
      <div className="border border-yellow-500 rounded-lg p-4 bg-gradient-to-r from-yellow-900/20 to-yellow-800/20">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-yellow-400">VIP Pass</h4>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="vipPass"
              checked={cardData.eliteFeatures?.vipPass || false}
              onChange={(e) => handleInputChange('eliteFeatures', 'vipPass', e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="vipPass" className="text-sm text-gray-300">
              Enable VIP Pass
            </label>
          </div>
        </div>
        
        {cardData.eliteFeatures?.vipPass && (
          <ColorPicker
            label="VIP Pass Color"
            value={cardData.eliteFeatures?.vipPassColor || '#FFD700'}
            onChange={(color) => handleInputChange('eliteFeatures', 'vipPassColor', color)}
          />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Source Funding for Job Creation"
          value={cardData.eliteFeatures?.sourceJobCreation || ''}
          onChange={(e) => handleInputChange('eliteFeatures', 'sourceJobCreation', e.target.value)}
          placeholder="https://funding-link.com"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Clients and Affiliates"
          value={cardData.eliteFeatures?.clientsAndAffiliates || ''}
          onChange={(e) => handleInputChange('eliteFeatures', 'clientsAndAffiliates', e.target.value)}
          placeholder="https://clients-link.com"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Our Network"
          value={cardData.eliteFeatures?.ourNetwork || ''}
          onChange={(e) => handleInputChange('eliteFeatures', 'ourNetwork', e.target.value)}
          placeholder="https://network-link.com"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Elite Business Owners"
          value={cardData.eliteFeatures?.eliteBusinessOwners || ''}
          onChange={(e) => handleInputChange('eliteFeatures', 'eliteBusinessOwners', e.target.value)}
          placeholder="https://elite-owners-link.com"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="More2Earn"
          value={cardData.businessInfo?.more2Earn || ''}
          onChange={(e) => handleInputChange('businessInfo', 'more2Earn', e.target.value)}
          placeholder="https://more2earn-link.com"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="OfferZone"
          value={cardData.eliteFeatures?.offerZone || ''}
          onChange={(e) => handleInputChange('eliteFeatures', 'offerZone', e.target.value)}
          placeholder="https://offerzone-link.com"
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>
    </div>
  );
};

export default EliteFeatures;