import React, { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  // Move the "404" text slightly when hovering near it
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 100;
    const y = (e.clientY - rect.top) / rect.height * 100;

    // Calculate new position with subtle movement
    const newX = 50 + (x - 50) * 0.1;
    const newY = 50 + (y - 50) * 0.1;

    setPosition({ x: newX, y: newY });
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center justify-center p-4"
      onMouseMove={handleMouseMove}
    >

      <div className="text-center max-w-2xl mx-auto relative">
        {/* Animated 404 text */}
        <div
          className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-8 transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${position.x - 50}px, ${position.y - 50}px)`
          }}
        >
          404
        </div>

        <h1 className="text-3xl font-semibold mb-4 text-gray-800">
          Oops! This page has gone exploring
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Don't worry though, there are plenty of other great pages to discover!
        </p>

        {/* Navigation buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <Home className="w-5 h-5" />
            Go Home
          </button>

          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Search className="w-5 h-5" />
            Search Site
          </button>

          <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply blur-xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>
    </div>
  );
};

export default NotFound;