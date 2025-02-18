import React, {createContext, useState, useEffect, useContext} from 'react';
import { getpopularTags, featuredPost, getlatestArticles } from '../services/blogApi';
export const HomePageContext = createContext();

export const HomePageProvider = ({ children }) => {
  const [featured_Post, setFeaturedPost] = useState({
    title: 'Loading...',
    author: 'Loading...',
    authorid: 'Loading...',
    category: 'Loading...',
    content: 'Loading...'
  });
  const [popularTags, setPopularTags] = useState(['Loading...']);
  const [latestArticles, setLatestArticles] = useState([
    {
      id: '1',
      title: 'Loading...',
      author: 'Loading...',
      authorId: { _id: 'Loading...' },
      category: 'Loading...',
      content: 'Loading...',
      image: 'Loading...'
    }
  ]);

  const fetchFeaturedPost = async () => {
    const response = await featuredPost();
    setFeaturedPost(response.data);
  };

  const fetchPopularTags = async () => {
    const response = await getpopularTags();
    setPopularTags(response.data);
  };

  const fetchLatestArticles = async () => {
    const response = await getlatestArticles();
    setLatestArticles(response.data);
  };

  useEffect(() => {
    fetchFeaturedPost();
    fetchPopularTags();
    fetchLatestArticles();
  }, []);


  return (
    <HomePageContext.Provider value={{ featured_Post, popularTags, latestArticles, fetchFeaturedPost, fetchPopularTags, fetchLatestArticles }}>
      {children}
    </HomePageContext.Provider>
  );
};

export const useHome = () => useContext(HomePageContext);
