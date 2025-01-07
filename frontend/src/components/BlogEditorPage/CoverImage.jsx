import React, { useState } from 'react';
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

const CoverImage = ({ coverImage, onImageChange, onImageRemove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative h-[200px] sm:h-[250px] md:h-[300px] bg-gray-100 rounded-t-lg overflow-hidden group">
      {coverImage ? (
        <>
          <img
            src={URL.createObjectURL(coverImage)}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 p-4">
            <button
              onClick={handleImageClick}
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
          <button
            onClick={handleImageClick}
            className="mt-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Add Cover Image
          </button>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onImageChange}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onImageRemove}
      />
    </div>
  );
};

export default CoverImage;