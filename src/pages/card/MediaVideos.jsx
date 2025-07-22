import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import FileUpload from '../../components/ui/FileUpload.jsx';

const MediaVideos = ({ 
  cardData, 
  handleInputChange, 
  addVideoTile, 
  removeVideoTile, 
  updateVideoTile, 
  addGalleryImage, 
  removeGalleryImage 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Media & Videos</h3>
      
      <div>
        <Input
          label="Intro Video URL"
          value={cardData.media?.introVideo || ''}
          onChange={(e) => handleInputChange('media', 'introVideo', e.target.value)}
          placeholder="YouTube or Vimeo video URL"
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      {/* Video Tiles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-white">Video Tiles</h4>
          <Button size="sm" onClick={addVideoTile}>
            <Plus className="h-4 w-4 mr-1" />
            Add Video
          </Button>
        </div>
        
        <div className="space-y-4">
          {cardData.media?.videoTiles?.map((video) => (
            <div key={video.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium text-white">Video</h5>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeVideoTile(video.id)}
                  className="border-red-600 text-red-400 hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Video Title"
                  value={video.title}
                  onChange={(e) => updateVideoTile(video.id, 'title', e.target.value)}
                  placeholder="Video title"
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Input
                  label="Video URL"
                  value={video.url}
                  onChange={(e) => updateVideoTile(video.id, 'url', e.target.value)}
                  placeholder="YouTube/Vimeo URL"
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <div className="md:col-span-2">
                  <FileUpload
                    label="Video Thumbnail"
                    onUpload={(url) => updateVideoTile(video.id, 'thumbnail', url)}
                    currentFile={video.thumbnail}
                    buttonText="Upload Thumbnail"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-white">Gallery Images</h4>
          <FileUpload
            onUpload={addGalleryImage}
            buttonText="Add Image"
            accept="image/*"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cardData.media?.gallery?.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeGalleryImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaVideos;