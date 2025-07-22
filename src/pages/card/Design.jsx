import React from 'react';
import ColorPicker from '../../components/ui/ColorPicker.jsx';

const Design = ({ cardData, setCardData, handleInputChange }) => {
  function getCardTypeColor(cardType) {
    switch (cardType) {
      case 'gallium': return '#6B7280'; // Gray
      case 'gold': return '#F59E0B'; // Gold
      case 'palladium': return '#8B5CF6'; // Purple
      case 'platinum': return '#10B981'; // Emerald
      case 'rhodium': return '#EF4444'; // Red
      case 'vip-pass': return '#FFD700'; // Gold
      default: return '#6B7280';
    }
  }

  function getCardTypeSecondaryColor(cardType) {
    switch (cardType) {
      case 'gallium': return '#374151';
      case 'gold': return '#D97706';
      case 'palladium': return '#7C3AED';
      case 'platinum': return '#059669';
      case 'rhodium': return '#DC2626';
      case 'vip-pass': return '#F59E0B';
      default: return '#374151';
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Design Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Card Type</label>
          <select
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cardData.cardType || 'gallium'}
            onChange={(e) => {
              const newCardType = e.target.value;
              setCardData(prev => ({
                ...prev,
                cardType: newCardType,
                design: {
                  ...prev.design,
                  primaryColor: getCardTypeColor(newCardType),
                  secondaryColor: getCardTypeSecondaryColor(newCardType),
                  colorBand: getCardTypeColor(newCardType)
                }
              }));
            }}
          >
            <option value="gallium">Gallium (Free 7 days)</option>
            <option value="gold">Gold</option>
            <option value="palladium">Palladium</option>
            <option value="platinum">Platinum</option>
            <option value="rhodium">Rhodium</option>
            <option value="vip-pass">VIP Pass</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
          <select
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cardData.design?.theme || 'modern'}
            onChange={(e) => handleInputChange('design', 'theme', e.target.value)}
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="minimal">Minimal</option>
            <option value="creative">Creative</option>
            <option value="professional">Professional</option>
            <option value="elegant">Elegant</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Layout</label>
          <select
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cardData.design?.layout || 'standard'}
            onChange={(e) => handleInputChange('design', 'layout', e.target.value)}
          >
            <option value="standard">Standard</option>
            <option value="compact">Compact</option>
            <option value="detailed">Detailed</option>
            <option value="minimal">Minimal</option>
            <option value="showcase">Showcase</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ColorPicker
          label="Primary Color (Color Band)"
          value={cardData.design?.primaryColor || getCardTypeColor(cardData.cardType || 'gallium')}
          onChange={(color) => {
            handleInputChange('design', 'primaryColor', color);
            handleInputChange('design', 'colorBand', color);
          }}
        />
        <ColorPicker
          label="Secondary Color"
          value={cardData.design?.secondaryColor || getCardTypeSecondaryColor(cardData.cardType || 'gallium')}
          onChange={(color) => handleInputChange('design', 'secondaryColor', color)}
        />
      </div>

      {/* Card Type Preview */}
      <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
        <h4 className="text-md font-medium text-white mb-4">Card Type Preview</h4>
        <div className="flex items-center space-x-4">
          <div 
            className="w-20 h-12 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: cardData.design?.primaryColor || getCardTypeColor(cardData.cardType || 'gallium') }}
          >
            {cardData.cardType?.toUpperCase()}
          </div>
          <div className="text-sm text-gray-300">
            <p>This color band will appear on your card to indicate the card type.</p>
            <p>Physical cards will have this color band printed on them.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;