import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = () => {
  return (
    <div className="flex justify-center text-white items-center space-x-2 my-8">
      <button className="p-2 rounded hover:bg-gray-100">
        <ChevronLeft size={20} />
      </button>
      <button className="px-4 py-2 rounded hover:bg-gray-100">01</button>
      <button className="px-4 py-2 rounded bg-pink-500 text-white">02</button>
      <button className="px-4 py-2 rounded hover:bg-gray-100">03</button>
      <span className="px-4 py-2">...</span>
      <button className="px-4 py-2 rounded hover:bg-gray-100">15</button>
      <button className="px-4 py-2 rounded hover:bg-gray-100">16</button>
      <button className="p-2 rounded hover:bg-gray-100">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;