import React from 'react';
import {useNavigate} from "react-router-dom";
import ReactMarkdown from "react-markdown";

const ArticleCard = ({ title, author, authorid, category, description, image, onClick}) => {
  const navigate = useNavigate();

  const handleAuthorClick = (e) => {
    e.stopPropagation();
    navigate(`/author/${authorid}`);
  }
  return (
    <div className="flex flex-col border border-gray-500 md:flex-row gap-4 p-4 rounded-lg hover:bg-gray-500 text-white" onClick={onClick}>
      <div className="flex-1">
        <div className="mb-2">
          <span className="text-sm text-gray-600 uppercase">{category}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">
          <ReactMarkdown>{description}</ReactMarkdown>
        </p>
        <div className="text-sm text-white" onClick={handleAuthorClick}>
          By {author}
        </div>
      </div>
      {image && (
        <div className="w-full md:w-48">
          <img src={image} alt={title} className="md:w-full md:h-32 w-full h-40 object-cover rounded-lg"/>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;