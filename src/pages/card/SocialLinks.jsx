import React from 'react';
import Input from '../../components/ui/Input.jsx';


const SocialLinks = ({ cardData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Social Media Links</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="LinkedIn"
          value={cardData.socialLinks?.linkedin || ''}
          onChange={(e) => handleInputChange('socialLinks', 'linkedin', e.target.value)}
          placeholder="https://linkedin.com/in/username"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Twitter/X"
          value={cardData.socialLinks?.twitter || ''}
          onChange={(e) => handleInputChange('socialLinks', 'twitter', e.target.value)}
          placeholder="https://twitter.com/username"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Instagram"
          value={cardData.socialLinks?.instagram || ''}
          onChange={(e) => handleInputChange('socialLinks', 'instagram', e.target.value)}
          placeholder="https://instagram.com/username"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Facebook"
          value={cardData.socialLinks?.facebook || ''}
          onChange={(e) => handleInputChange('socialLinks', 'facebook', e.target.value)}
          placeholder="https://facebook.com/username"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="YouTube"
          value={cardData.socialLinks?.youtube || ''}
          onChange={(e) => handleInputChange('socialLinks', 'youtube', e.target.value)}
          placeholder="https://youtube.com/channel/..."
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="WhatsApp"
          value={cardData.socialLinks?.whatsapp || ''}
          onChange={(e) => handleInputChange('socialLinks', 'whatsapp', e.target.value)}
          placeholder="+91 9999999999"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Website"
          value={cardData.socialLinks?.website || ''}
          onChange={(e) => handleInputChange('socialLinks', 'website', e.target.value)}
          placeholder="https://yourwebsite.com"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Reviews Link"
          value={cardData.socialLinks?.reviews || ''}
          onChange={(e) => handleInputChange('socialLinks', 'reviews', e.target.value)}
          placeholder="https://reviews-link.com"
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>
    </div>
  );
};

export default SocialLinks;