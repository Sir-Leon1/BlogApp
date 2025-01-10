import React, { useState, useRef, useEffect } from 'react';
import { BLOG_CATEGORIES } from '../../constants/categoryData';

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = BLOG_CATEGORIES.find(cat => cat.id === selectedCategory)?.label || 'Select Category';

  return (
    <div className="relative w-full sm:w-64" ref={dropdownRef}>
      <button
        type="button"
        className="w-full px-4 py-2.5 text-left bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-base">
            {selectedLabel}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {BLOG_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors
                ${selectedCategory === category.id ? 'bg-gray-50 font-medium' : ''}
                ${category.id === BLOG_CATEGORIES[BLOG_CATEGORIES.length - 1].id ? '' : 'border-b border-gray-100'}`}
              onClick={() => {
                onCategoryChange(category.id);
                setIsOpen(false);
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;