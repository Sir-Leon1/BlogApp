import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [viewedBlogs, setViewedBlogs] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('userId');
    if (storedUser) {
      setUser(JSON.stringify(storedUser));
    }
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const addViewedBlog = async (blogId) => {
    if (user) {
      await axios.post('/api/users/viewedBlogs', { userId: user.id, blogId });
      setViewedBlogs([...viewedBlogs, blogId]);
    }
  };

  const fetchViewedBlogs = async () => {
    if (user) {
      const response = await axios.get(`/api/users/${user.id}/viewedBlogs`);
      setViewedBlogs(response.data);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, addViewedBlog, fetchViewedBlogs }}>
      {children}
    </UserContext.Provider>
  );
};