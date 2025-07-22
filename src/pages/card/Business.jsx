import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';

const Business = ({ 
  cardData, 
  handleInputChange, 
  setCardData, 
  addReview, 
  removeReview, 
  updateReview 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Business Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Established Date"
          type="date"
          value={cardData.businessInfo?.establishedDate || ''}
          onChange={(e) => handleInputChange('businessInfo', 'establishedDate', e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Input
          label="Google Review Link"
          value={cardData.businessInfo?.googleReviewLink || ''}
          onChange={(e) => handleInputChange('businessInfo', 'googleReviewLink', e.target.value)}
          placeholder="Google review page URL"
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">About Us (Minimum 200 characters)</label>
        <textarea
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          value={cardData.businessInfo?.aboutUs || ''}
          onChange={(e) => handleInputChange('businessInfo', 'aboutUs', e.target.value)}
          placeholder="Tell people about your business, services, and what makes you unique (minimum 200 characters)"
          minLength={200}
        />
        <p className="text-sm text-gray-400 mt-1">
          {cardData.businessInfo?.aboutUs?.length || 0}/200 characters
        </p>
      </div>

      {/* Multiple Review Links */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-300">Review Links</label>
          <Button size="sm" onClick={addReview}>
            <Plus className="h-4 w-4 mr-1" />
            Add Review Link
          </Button>
        </div>
        <div className="space-y-3">
          {cardData.businessInfo?.reviews?.map((review, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Input
                value={review}
                onChange={(e) => updateReview(index, e.target.value)}
                placeholder="https://review-link.com"
                className="bg-gray-800 border-gray-700 text-white flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeReview(index)}
                className="border-red-600 text-red-400 hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Form Toggles */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-white">Contact Forms</h4>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="feedbackEnabled"
            checked={cardData.feedbackEnabled || false}
            onChange={(e) => setCardData(prev => ({ ...prev, feedbackEnabled: e.target.checked }))}
            className="mr-2"
          />
          <label htmlFor="feedbackEnabled" className="text-sm text-gray-300">
            Enable Feedback Form
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="contactFormEnabled"
            checked={cardData.contactFormEnabled || false}
            onChange={(e) => setCardData(prev => ({ ...prev, contactFormEnabled: e.target.checked }))}
            className="mr-2"
          />
          <label htmlFor="contactFormEnabled" className="text-sm text-gray-300">
            Enable Contact Us - Customer Support Form
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="partnerFormEnabled"
            checked={cardData.partnerFormEnabled || false}
            onChange={(e) => setCardData(prev => ({ ...prev, partnerFormEnabled: e.target.checked }))}
            className="mr-2"
          />
          <label htmlFor="partnerFormEnabled" className="text-sm text-gray-300">
            Enable Partner with Us Contact Form
          </label>
        </div>
      </div>
    </div>
  );
};

export default Business;