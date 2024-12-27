import React, { useState } from 'react';
import { Heart, Share2, MessageSquare, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialShareUnderHeader = () => {
  const [likes, setLikes] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleLike = () => {
    setLikes(prev => prev + 1);
  };

  const handleShare = () => {
    setShowShareTooltip(true);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  return (
    <motion.div
      className="flex justify-center space-x-4 mt-4 mb-4 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        className="p-2 text-gray-500 hover:text-pink-500 relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleLike}
      >
        <Heart className={likes > 0 ? 'fill-pink-500 text-pink-500' : ''} size={20} />
        {likes > 0 && (
          <span className="absolute -right-8 text-sm">{likes}</span>
        )}
        <span className="invisible group-hover:visible absolute left-12 white px-2 py-1 text-sm bg-gray-800 text-white rounded whitespace-nowrap">
          Like this article
        </span>
      </motion.button>

      <motion.button
        className="p-2 text-gray-500 hover:text-blue-500 relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleShare}
      >
        <Share2 size={20} />
        {showShareTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute left-12 white px-2 py-1 text-sm bg-blue-500 text-white rounded whitespace-nowrap"
          >
            Copied to clipboard!
          </motion.div>
        )}
        <span className="invisible group-hover:visible absolute left-12 white px-2 py-1 text-sm bg-gray-800 text-white rounded whitespace-nowrap">
          Share article
        </span>
      </motion.button>

      <motion.a
        href="#comments"
        className="p-2 text-gray-500 hover:text-green-500 relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare size={20} />
        <span className="invisible group-hover:visible absolute left-12 white px-2 py-1 text-sm bg-gray-800 text-white rounded whitespace-nowrap">
          Jump to comments
        </span>
      </motion.a>

      <motion.button
        className="p-2 text-gray-500 hover:text-purple-500 relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsBookmarked(!isBookmarked)}
      >
        <Bookmark className={isBookmarked ? 'fill-purple-500 text-purple-500' : ''} size={20} />
        <span className="invisible group-hover:visible absolute left-12 white px-2 py-1 text-sm bg-gray-800 text-white rounded whitespace-nowrap">
          {isBookmarked ? 'Bookmarked' : 'Bookmark article'}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default SocialShareUnderHeader;