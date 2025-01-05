// src/components/CoverImage/CoverImage.js
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { IconImage } from './icons';

const CoverImage = ({ coverImage, onImageChange, onImageRemove }) => {
  const fileInputRef = React.useRef(null);

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
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="secondary"
              className="w-full sm:w-auto text-xs sm:text-sm hover:bg-blue-600"
            >
              Change Image
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto text-xs sm:text-sm">
                  Remove Image
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove Cover Image?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove the cover image? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onImageRemove}>Remove</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <IconImage />
          <Button
            variant="secondary"
            className="mt-2 text-xs sm:text-sm"
            onClick={() => fileInputRef.current?.click()}
          >
            Add Cover Image
          </Button>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onImageChange}
      />
    </div>
  );
};

export default CoverImage;
