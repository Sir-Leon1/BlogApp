import React from 'react';
import { Button } from '../../../components/ui/button';
import { IconBack, IconEye, IconSave } from './icons.jsx';

const Header = ({ isPreview, onTogglePreview, onPublish }) => (
  <header className=" border-b rounded border-gray-200  sticky top-0 z-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1658662882873-df79fb55df4c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwd2F0ZXJ8ZW58MHx8MHx8fDA%3D)',
            backgroundSize: 'revert',
            backgroundPosition: 'center'
          }}
  >
    <div className={"absolute inset-0 bg-purple-900 opacity-75 rounded-lg rounded"}></div>
    <div className="max-w-5xl mx-auto px-4 py-3 md:py-4 relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <button className="flex items-center text-gray-600 hover:text-gray-900 gap-1 text-white">
          <IconBack/>
          <span className="text-sm sm:text-base text-white">Back</span>
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            onClick={onTogglePreview}
            variant="outline"
            className="flex-1 sm:flex-none text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
          >
            <IconEye/>
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button
            onClick={onPublish}
            className="flex-1 sm:flex-none text-xs sm:text-sm flex items-center gap-1 sm:gap-2v text-white"
          >
            <IconSave/>
            Publish
          </Button>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
