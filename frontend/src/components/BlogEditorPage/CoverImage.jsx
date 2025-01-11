// src/components/CoverImage/CoverImage.js
import React, { useState, useRef } from 'react';
import { IconImage } from './icons';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
        <h2 className="text-xl font-semibold mb-4">Remove Cover Image?</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove the cover image? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

const ImageUploadOptions = ({ onOptionSelect }) => (
  <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
    <button
      onClick={() => onOptionSelect('file')}
      className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      Upload Image
    </button>
    <span className="text-gray-500 text-sm">or</span>
    <button
      onClick={() => onOptionSelect('url')}
      className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      Add Image URL
    </button>
  </div>
);

const CoverImage = ({ coverImage, onImageChange, onImageRemove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageChange({ type: 'file', data: file });
      setUploadType(null);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      onImageChange({ type: 'url', data: imageUrl.trim(), url: imageUrl });
      setImageUrl('');
      setUploadType(null);
    }
  };

  const renderUploadInterface = () => {
    if (uploadType === 'file') {
      return (
        <div className="text-center mt-2">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Choose File
          </button>
        </div>
      );
    }

    if (uploadType === 'url') {
      return (
        <form onSubmit={handleUrlSubmit} className="mt-2 flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
            className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Image
          </button>
        </form>
      );
    }

    return null;
  };

  const imageSource = coverImage?.type === 'url' ? coverImage.data :
    coverImage?.type === 'file' ? URL.createObjectURL(coverImage.data) : null;

  return (
    <div className="relative h-[200px] sm:h-[250px] md:h-[300px] bg-gray-100 rounded-t-lg overflow-hidden group">
      {imageSource ? (
        <>
          <img
            src={imageSource}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 p-4">
            <button
              onClick={() => setUploadType('file')}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Change Image
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Remove Image
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <IconImage />
          {!uploadType ? (
            <ImageUploadOptions onOptionSelect={setUploadType} />
          ) : (
            <>
              {renderUploadInterface()}
              <button
                onClick={() => setUploadType(null)}
                className="mt-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onImageRemove}
      />
    </div>
  );
};

export default CoverImage;