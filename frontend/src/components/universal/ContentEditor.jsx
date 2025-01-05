// src/components/ContentEditor/ContentEditor.js
import React from 'react';

const ContentEditor = ({ content, isPreview, onChange }) => (
  <div className="relative">
    {isPreview ? (
      <div className="prose max-w-none text-sm sm:text-base">
        {content}
      </div>
    ) : (
      <>
        <textarea
          placeholder="Write your blog post in markdown..."
          value={content}
          onChange={onChange}
          className="w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base md:text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
        />
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-xs sm:text-sm text-gray-400">
          {content.length} characters
        </div>
      </>
    )}
  </div>
);

export default ContentEditor;
