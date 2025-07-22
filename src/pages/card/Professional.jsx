import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import FileUpload from '../../components/ui/FileUpload.jsx';

const Professional = ({ 
  cardData, 
  handleInputChange, 
  addQRCodeImage, 
  removeQRCodeImage, 
  addCustomUrl, 
  removeCustomUrl, 
  updateCustomUrl, 
  addProject, 
  removeProject, 
  updateProject 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Professional Features</h3>
      
      {/* QR Code Images */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-white">QR Code Section</h4>
          <FileUpload
            onUpload={addQRCodeImage}
            buttonText="Add QR Code"
            accept="image/*"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cardData.professionalInfo?.qrCodeImages?.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`QR Code ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeQRCodeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom URLs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-white">Custom URLs</h4>
          <Button size="sm" onClick={addCustomUrl}>
            <Plus className="h-4 w-4 mr-1" />
            Add URL
          </Button>
        </div>
        
        <div className="space-y-3">
          {cardData.professionalInfo?.customUrls?.map((urlItem, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Input
                value={urlItem.name}
                onChange={(e) => updateCustomUrl(index, 'name', e.target.value)}
                placeholder="Link name"
                className="bg-gray-800 border-gray-700 text-white flex-1"
              />
              <Input
                value={urlItem.url}
                onChange={(e) => updateCustomUrl(index, 'url', e.target.value)}
                placeholder="https://example.com"
                className="bg-gray-800 border-gray-700 text-white flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeCustomUrl(index)}
                className="border-red-600 text-red-400 hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-white">Projects/Past Work</h4>
          <Button size="sm" onClick={addProject}>
            <Plus className="h-4 w-4 mr-1" />
            Add Project
          </Button>
        </div>
        
        <div className="space-y-4">
          {cardData.professionalInfo?.projects?.map((project) => (
            <div key={project.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium text-white">Project</h5>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="border-red-600 text-red-400 hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Project Title"
                  value={project.title}
                  onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                  placeholder="Project name"
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Input
                  label="Project URL"
                  value={project.url}
                  onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                  placeholder="https://project-url.com"
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <div className="md:col-span-2">
                  <FileUpload
                    label="Project Image"
                    onUpload={(url) => updateProject(project.id, 'image', url)}
                    currentFile={project.image}
                    buttonText="Upload Image"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Project description"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment URL */}
      <div>
        <Input
          label="Appointment Booking URL"
          value={cardData.professionalInfo?.appointmentUrl || ''}
          onChange={(e) => handleInputChange('professionalInfo', 'appointmentUrl', e.target.value)}
          placeholder="https://calendly.com/your-link"
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      {/* Partner Form Toggle */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="partnerForm"
          checked={cardData.professionalInfo?.partnerForm || false}
          onChange={(e) => handleInputChange('professionalInfo', 'partnerForm', e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="partnerForm" className="text-sm text-gray-300">
          Enable "Partner with Us" Contact Form
        </label>
      </div>
    </div>
  );
};

export default Professional;