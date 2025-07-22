import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import FileUpload from '../../components/ui/FileUpload.jsx';

const Services = ({ 
  cardData, 
  addService, 
  removeService, 
  updateService 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Services</h3>
        <Button onClick={addService} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Service
        </Button>
      </div>

      <div className="space-y-4">
        {cardData.services?.map((service) => (
          <div key={service.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-white">Service</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeService(service.id)}
                className="border-red-600 text-red-400 hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Service Title"
                value={service.title}
                onChange={(e) => updateService(service.id, 'title', e.target.value)}
                placeholder="Service name"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Input
                label="Enquiry Link"
                value={service.link}
                onChange={(e) => updateService(service.id, 'link', e.target.value)}
                placeholder="WhatsApp or contact link"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Input
                label="Category"
                value={service.category}
                onChange={(e) => updateService(service.id, 'category', e.target.value)}
                placeholder="Consulting, Development, etc."
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Input
                label="Price"
                value={service.price}
                onChange={(e) => updateService(service.id, 'price', e.target.value)}
                placeholder="₹5000 or Contact for pricing"
                className="bg-gray-700 border-gray-600 text-white"
              />
              <div className="md:col-span-2">
                <FileUpload
                  label="Service Image"
                  onUpload={(url) => updateService(service.id, 'image', url)}
                  currentFile={service.image}
                  buttonText="Upload Image"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                value={service.description}
                onChange={(e) => updateService(service.id, 'description', e.target.value)}
                placeholder="Service description"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;