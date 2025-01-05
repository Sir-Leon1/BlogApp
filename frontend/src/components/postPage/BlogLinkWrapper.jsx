import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleLinkWrapper = ({ articleId, children }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${articleId}`);
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
};

export default ArticleLinkWrapper;