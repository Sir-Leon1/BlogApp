import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, Filter, Clock, Eye, Calendar, BookOpen, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { HomePageProvider, useHome } from "../../../contexts/HomePageContext.jsx";
import {useNavigate} from "react-router-dom";
import {addHistory} from "../../../services/userApi.js";

const generateSearchData = (latestArticles) => {
  const topics = ['Beginner', 'Advanced', 'Tutorial', 'Guide', 'Best Practices', 'Tips & Tricks'];

  return latestArticles.map(article => ({
    ...article,
    tags: [
      article.category,
      topics[Math.floor(Math.random() * topics.length)],
      `${article.category} ${Math.floor(Math.random() * 100 + 1)}`
    ],
    excerpt: `Learn about ${article.title.toLowerCase()} in this comprehensive guide...`,
    views: Math.floor(Math.random() * 1000),
    readTime: `${Math.floor(Math.random() * 10) + 1} min read`,
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [testData, setTestData] = useState(generateSearchData([]));
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
  const [sortBy, setSortBy] = useState('relevance');
  const searchRef = useRef(null);
  const { latestArticles } = useHome();

  useEffect(() => {
    setTestData(generateSearchData(latestArticles));
    console.log(latestArticles);
  }, [latestArticles]);

  const calculateSearchStats = (results) => {
    const startTime = performance.now();

    const stats = {
      totalResults: results.length,
      searchTime: ((performance.now() - startTime) / 1000).toFixed(3),
      popularCategories: results.reduce((acc, article) => {
        acc[article.category] = (acc[article.category] || 0) + 1;
        return acc;
      }, {}),
      averageViews: results.reduce((acc, article) => acc + article.views, 0) / (results.length || 1)
    };

    setSearchStats(stats);
  };

  const applyFilters = (results) => {
    return results.filter(article => {
      const categoryMatch = filters.categories.length === 0 ||
        filters.categories.includes(article.category);

      const dateMatch = filters.dateRange === 'all' ||
        (filters.dateRange === 'week' && new Date(article.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
        (filters.dateRange === 'month' && new Date(article.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

      const difficultyMatch = filters.difficulty.length === 0 ||
        filters.difficulty.includes(article.difficulty);

      const viewsMatch = article.views >= filters.minViews;

      const tagsMatch = filters.tags.length === 0 ||
        filters.tags.some(tag => article.tags.includes(tag));

      return categoryMatch && dateMatch && difficultyMatch && viewsMatch && tagsMatch;
    });
  };

  const sortResults = (results) => {
    switch (sortBy) {
      case 'date':
        return [...results].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'views':
        return [...results].sort((a, b) => b.views - a.views);
      case 'engagement':
        return [...results].sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments));
      default: // 'relevance'
        return results;
    }
  };

  useEffect(() => {
    const searchArticles = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));

      const searchTerm = query.toLowerCase();
      let filtered = testData.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        article.excerpt.toLowerCase().includes(searchTerm)
      );

      filtered = applyFilters(filtered);
      filtered = sortResults(filtered);
      calculateSearchStats(filtered);

      setSuggestions(filtered);
      setIsLoading(false);
    };

    searchArticles();
  }, [query, filters, sortBy, testData]);

  const navigate = useNavigate();

  async function handleResultClick(id) {
    console.log("Article clicked:", id);
    await addHistory({
      userId: localStorage.getItem("userId"),
      blogId: id
    })
    navigate(`/article/${id}`);
  };

  const ResultCard = ({ article, onClick }) => (
    <div className="p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0" onClick={() => onClick(article)}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-medium text-lg text-gray-900">{article.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{article.excerpt}</p>
        </div>
        <div className="text-right text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {article.views.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {article.tags.map((tag, index) => (
          <span key={index} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
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
        by {article.author} • {article.author.role}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto relative" ref={searchRef}>
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
              className="w-full sm:w-200 h-8 sm:h-8 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
        </div>

        {query.length >= 2 && !isLoading && (
          <div className="mt-2 text-sm text-gray-400">
            Found {searchStats.totalResults} results ({searchStats.searchTime}s)
            {searchStats.totalResults > 0 && (
              <span> • Average {Math.round(searchStats.averageViews)} views</span>
            )}
          </div>
        )}

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
                    <ResultCard article={article} onClick={handleResultClick(article.id)} />
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

export { generateSearchData };
export default SearchBar;
