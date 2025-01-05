import React from 'react';

export const TextArea = ({ className = '', ...props }) => (
  <textarea
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${className}`}
    {...props}
  />
);

export default TextArea;