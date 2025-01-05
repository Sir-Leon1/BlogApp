import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const ImageLightbox = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative group cursor-zoom-in">
        <img src={src} alt={alt} className="rounded-lg" />
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
        >
          <ZoomIn className="text-white opacity-0 group-hover:opacity-100" />
        </motion.div>
        <button
          onClick={() => setIsOpen(true)}
          className="absolute inset-0 w-full h-full cursor-zoom-in"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.button
              className="absolute top-4 right-4 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>
            <motion.img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageLightbox;