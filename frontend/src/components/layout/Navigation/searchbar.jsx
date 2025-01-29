/**import React from "react";

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
 */

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, Filter, Clock, Eye, Calendar, BookOpen, Tag, ChevronDown, ChevronUp } from 'lucide-react';

// Previous data generation code remains the same...
const generateTestData = () => {
  // ... (previous test data generation code)
};

const SearchBar = () => {
  // Previous state declarations remain the same...
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [testData] = useState(generateTestData());
  const [filters, setFilters] = useState({
    categories: [],
    dateRange: 'all',
    difficulty: [],
    minViews: 0,
    tags: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [searchStats, setSearchStats] = useState({
    totalResults: 0,
    searchTime: 0,
    popularCategories: {},
    averageViews: 0
  });
  const searchRef = useRef(null);

  // Previous helper functions remain the same...

  return (
    <div className="w-full max-w-3xl mx-auto relative" ref={searchRef}>
      {/* Main search bar */}
      <div className="relative z-50">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
                setSelectedIndex(-1);
              }}
              placeholder="Search articles..."
              className="w-full sm:w-200 h-8 sm:h-8 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-300" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-800 text-gray-300"
          >
            <Filter className="w-5 h-5" />
            Filters
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Filters panel - Absolute positioning 
        {showFilters && (
          <div className="absolute h-8 w-full mt-2 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Categories
                </label>
                <select
                  multiple
                  value={filters.categories}
                  onChange={(e) => setFilters({
                    ...filters,
                    categories: Array.from(e.target.selectedOptions, option => option.value)
                  })}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300"
                >
                  {['React', 'JavaScript', 'TypeScript', 'CSS', 'Node.js'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300"
                >
                  <option value="all">All time</option>
                  <option value="week">Past week</option>
                  <option value="month">Past month</option>
                </select>
              </div>
            </div>
          </div>
        )}*/}

        {/* Search statistics */}
        {query.length >= 2 && !isLoading && (
          <div className="mt-2 text-sm text-gray-400">
            Found {searchStats.totalResults} results ({searchStats.searchTime}s)
            {searchStats.totalResults > 0 && (
              <span> • Average {Math.round(searchStats.averageViews)} views</span>
            )}
          </div>
        )}

        {/* Results overlay */}
        {isOpen && (query.length >= 2 || suggestions.length > 0) && (
          <div className="absolute w-full mt-2 bg-gray-900 rounded-lg shadow-lg border border-gray-700 overflow-hidden z-40">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
              </div>
            ) : suggestions.length > 0 ? (
              <div>
                {suggestions.map((article) => (
                  <div
                    key={article.id}
                    className="p-4 hover:bg-gray-800 transition-colors border-b border-gray-700 last:border-b-0"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg text-gray-100">{article.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{article.excerpt}</p>
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-gray-800 text-blue-400 rounded-full border border-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {article.difficulty}
                      </div>
                    </div>

                    <div className="mt-2 text-sm text-gray-500">
                      by {article.author.name} • {article.author.role}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-gray-400">
                No results found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Overlay backdrop */}
      {(isOpen || showFilters) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => {
            setIsOpen(false);
            setShowFilters(false);
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
