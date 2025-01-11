import React, {useState} from 'react';
import {Menu, X} from 'lucide-react';
import SearchBar from "./Navigation/searchbar.jsx";
import ProfileButton from "./Navigation/ProfileButton.jsx";

const Navbar = ({isloggedin, userDetails, onLogout}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scrollToFooter = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth',
        });
    }
    return (
        <nav className="border-b border-gray-200 py-4 text-white">

            <div className="container mx-auto px-4 flex items-center justify-between">
                <div className="flex flex-row ">
                    <div className="sm:flex-col flex items-center">
                    <img
                      src="/pngwing.com%20(1).png"
                      alt="Webterm" className="h-10 w-10"/>
                    <h1 className="text-small font-bold text-white">Threaded</h1>
                    <h1 className="text-small font-bold text-white">Stories</h1>
                    </div>
                    <div className="flex md:flex-col flex-row items-center ">
                        <div className="flex items-center">
                            <div className="ml-8 hidden w-full sm:flex whitespace-nowrap space-x-4 text-white">
                                <a href="/" className=" hover:text-purple-500 text-white">Home</a>
                                <a href="#" className=" hover:text-purple-500 text-white">Popular</a>
                                <a href="/editor" className=" hover:text-purple-500 text-white">New</a>
                                <a href="/readinglists" className=" hover:text-purple-500 text-white">Reading
                                    list</a>
                                <a href="/topics" className="text-gray-600 hover:text-purple-500 text-white">Topics</a>
                            </div>
                        </div>
                        <div className="ml-8 sm:flex hidden flexspace-x-4 mt-4">
                            <SearchBar></SearchBar>
                            <button className="p-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hidden sm:flex items-center space-x-4">
                    {isloggedin ? (
                      <ProfileButton isMobileMenuOpen={isMobileMenuOpen}/>
                    ) : (
                        <button
                            onClick={scrollToFooter}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login / Register
                        </button>
                    )}
                </div>
                <div className="sm:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6"/>
                        ) : (
                            <Menu className="h-6 w-6"/>
                        )}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
              <div className="sm:hidden py-4 p-4">
                  <div className="px-3 py-2 flex justify-between mt-4">
                      <SearchBar></SearchBar>
                      <button className="p-2">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                          </svg>
                      </button>
                  </div>
                  <div className="space-y-2">
                      <a href="/" className="block px-3 py-2  hover:text-purple-500 text-white">Home</a>
                      <a href="#" className="block px-3 py-2  hover:text-purple-500 text-white">Popular</a>
                      <a href="/editor" className="block px-3 py-2  hover:text-purple-500 text-white">New</a>
                      <a href="/readinglists" className="block px-3 py-2  hover:text-purple-500 text-white">Reading
                          list</a>
                      <a href="/topics" className="block px-3 py-2  hover:text-purple-500 text-white">Topics</a>
                      {isloggedin ? (
                        <ProfileButton isMobileMenuOpen={isMobileMenuOpen}/>
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
        </nav>
    );
};

export default Navbar;