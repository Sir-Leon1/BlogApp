// src/components/Tags/Tags.js
import React, { useState } from 'react';
import { IconClose } from '../icons/icons';

const Tags = ({ tags, onTagAdd, onTagRemove }) => {
  const [currentTag, setCurrentTag] = useState('');

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        onTagAdd(currentTag.trim());
      }
      setCurrentTag('');
    }
  };

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-gray-100"
          >
            {tag}
            <button
              onClick={() => onTagRemove(tag)}
              className="ml-1 sm:ml-2 text-gray-500 hover:text-gray-700"
            >
              <IconClose />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder="Add tags... (Press Enter)"
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        onKeyDown={handleTagKeyDown}
        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Tags;
