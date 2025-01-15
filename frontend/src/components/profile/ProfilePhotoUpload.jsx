import React, { useState, useRef } from 'react';
import { X, Upload, Link, Image as ImageIcon } from 'lucide-react';

const ProfilePhotoUpload = ( {onClose} ) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('file');
  const [preview, setPreview] = useState(null);
  const [url, setUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setPreview(e.target.value);
  };

  const handleSave = () => {
    // Handle save logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Change Profile Photo</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex items-center gap-2 px-4 py-3 ${
              activeTab === 'file'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('file')}
          >
            <Upload size={18} />
            Upload File
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-3 ${
              activeTab === 'url'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('url')}
          >
            <Link size={18} />
            Image URL
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Preview */}
          <div className="mb-4">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto bg-gray-100 flex items-center justify-center">
                <ImageIcon className="text-gray-400" size={48} />
              </div>
            )}
          </div>

          {/* Upload methods */}
          {activeTab === 'file' ? (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
              >
                Choose a file
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                placeholder="Enter image URL"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!preview}
            className={`px-4 py-2 rounded-lg ${
              preview
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;