
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ isloggedin=true, userDetails, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-8"
              src="https://e1.pngegg.com/pngimages/279/350/png-clipart-black-letter-t.png"
              alt="Blog Logo"
            />
            <span className="ml-2 text-xl font-bold text-gray-900">ThreadedStories</span>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden sm:flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="/featured" className="text-gray-600 hover:text-gray-900">Featured Posts</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
          </nav>

          {/* Auth Section - Desktop */}
          <div className="hidden sm:flex items-center space-x-4">
            {isloggedin ? (
              <>
                <span className="text-gray-600">Welcome, {userDetails?.username}</span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => window.location.href = '/login'}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login / Register
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden py-4">
            <div className="space-y-2">
              <a href="/" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Home</a>
              <a href="/featured" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Featured Posts</a>
              <a href="/about" className="block px-3 py-2 text-gray-600 hover:text-gray-900">About</a>
              {isloggedin ? (
                <>
                  <span className="block px-3 py-2 text-gray-600">Welcome, {userDetails?.username}</span>
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => window.location.href = '/login'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login / Register
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;