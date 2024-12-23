import React from "react";

const SearchBar = () => {
  return (
    <div className=" sm:flex items-center">
      <input
        type="text"
        placeholder="Search..."
        className="w-full sm:w-200 h-8 sm:h-8 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      />
    </div>
  );
}

export default SearchBar;