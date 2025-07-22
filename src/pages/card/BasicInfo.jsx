import React from 'react';
import { Star, Crown, Zap, Plus, Trash2 } from 'lucide-react';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import FileUpload from '../../components/ui/FileUpload.jsx';

const BasicInfo = ({ 
  cardData, 
  handleInputChange, 
  addPhoneNumber, 
  removePhoneNumber, 
  updatePhoneNumber 
}) => {
  const getCardTypeBadge = (cardType) => {
    const badges = {
      gallium: { label: 'Gallium', color: 'bg-gray-500', icon: <Star className="h-4 w-4" /> },
      gold: { label: 'Gold', color: 'bg-yellow-500', icon: <Crown className="h-4 w-4" /> },
      palladium: { label: 'Palladium', color: 'bg-purple-500', icon: <Crown className="h-4 w-4" /> },
      platinum: { label: 'Platinum', color: 'bg-emerald-500', icon: <Crown className="h-4 w-4" /> },
      rhodium: { label: 'Rhodium', color: 'bg-red-500', icon: <Crown className="h-4 w-4" /> },
      'vip-pass': { label: 'VIP Pass', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600', icon: <Zap className="h-4 w-4" /> }
    };
    
    const badge = badges[cardType] || badges.gallium;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${badge.color}`}>
        {badge.icon}
        <span className="ml-1">{badge.label}</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Basic Information</h3>
        {getCardTypeBadge(cardData.cardType || 'gallium')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          value={cardData.personalInfo?.name || ''}
          onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
          placeholder="Enter your full name"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Designation"
          value={cardData.personalInfo?.designation || ''}
          onChange={(e) => handleInputChange('personalInfo', 'designation', e.target.value)}
          placeholder="Your job title"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Company Name"
          value={cardData.personalInfo?.company || ''}
          onChange={(e) => handleInputChange('personalInfo', 'company', e.target.value)}
          placeholder="Company name"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Primary Phone Number"
          value={cardData.personalInfo?.phone || ''}
          onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
          placeholder="+91 9999999999"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Email Address"
          type="email"
          value={cardData.personalInfo?.email || ''}
          onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
          placeholder="your@email.com"
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Website"
          value={cardData.personalInfo?.website || ''}
          onChange={(e) => handleInputChange('personalInfo', 'website', e.target.value)}
          placeholder="https://yourwebsite.com"
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      {/* Multiple Phone Numbers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-300">Additional Phone Numbers</label>
          <Button size="sm" onClick={addPhoneNumber}>
            <Plus className="h-4 w-4 mr-1" />
            Add Phone
          </Button>
        </div>
        <div className="space-y-3">
          {cardData.personalInfo?.multiplePhones?.map((phone, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Input
                value={phone}
                onChange={(e) => updatePhoneNumber(index, e.target.value)}
                placeholder="+91 9999999999"
                className="bg-gray-800 border-gray-700 text-white flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removePhoneNumber(index)}
                className="border-red-600 text-red-400 hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Office Address</label>
        <textarea
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          value={cardData.personalInfo?.address || ''}
          onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
          placeholder="Your complete office address"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">About/Bio (Minimum 200 characters)</label>
        <textarea
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={cardData.personalInfo?.bio || ''}
          onChange={(e) => handleInputChange('personalInfo', 'bio', e.target.value)}
          placeholder="Tell people about yourself or your business (minimum 200 characters)"
          minLength={200}
        />
        <p className="text-sm text-gray-400 mt-1">
          {cardData.personalInfo?.bio?.length || 0}/200 characters
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUpload
          label="Profile Image"
          onUpload={(url) => handleInputChange('personalInfo', 'profileImage', url)}
          currentFile={cardData.personalInfo?.profileImage}
        />
        <FileUpload
          label="Company Logo"
          onUpload={(url) => handleInputChange('personalInfo', 'companyLogo', url)}
          currentFile={cardData.personalInfo?.companyLogo}
        />
      </div>

      {/* Location with Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Location URL (Google Maps)"
          value={cardData.personalInfo?.locationUrl || ''}
          onChange={(e) => handleInputChange('personalInfo', 'locationUrl', e.target.value)}
          placeholder="https://maps.google.com/..."
          className="bg-gray-800 border-gray-700 text-white"
        />
        <FileUpload
          label="Location Image"
          onUpload={(url) => handleInputChange('personalInfo', 'locationImage', url)}
          currentFile={cardData.personalInfo?.locationImage}
        />
      </div>
    </div>
  );
};

export default BasicInfo;