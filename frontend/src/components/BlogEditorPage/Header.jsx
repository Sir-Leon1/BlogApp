import React from 'react';
import { Button } from '../../../components/ui/button';
import { IconBack, IconEye, IconSave } from './icons.jsx';

const Header = ({ isPreview, onTogglePreview, onPublish }) => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="max-w-5xl mx-auto px-4 py-3 md:py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <button className="flex items-center text-gray-600 hover:text-gray-900 gap-1">
          <IconBack />
          <span className="text-sm sm:text-base">Back</span>
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            onClick={onTogglePreview}
            variant="outline"
            className="flex-1 sm:flex-none text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
          >
            <IconEye />
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button 
            onClick={onPublish} 
            className="flex-1 sm:flex-none text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
          >
            <IconSave />
            Publish
          </Button>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
