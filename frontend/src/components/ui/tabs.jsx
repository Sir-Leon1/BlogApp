import React from 'react';

export const Tabs = ({ children, value, onChange }) => (
  <div className="w-full">
    {children}
  </div>
);

export const TabsList = ({ children }) => (
  <div className="flex space-x-1 border-b border-gray-200 mb-4">
    {children}
  </div>
);

export const TabsTrigger = ({ children, value, active, onClick }) => (
  <button
    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
      active
        ? 'border-blue-600 text-blue-600'
        : 'border-transparent text-gray-600 hover:text-gray-900'
    }`}
    onClick={() => onClick(onChange)}
  >
    {children}
  </button>
);

export const TabsContent = ({ children, value, activeValue }) => (
  <div className={value === activeValue ? 'block' : 'hidden'}>
    {children}
  </div>
);