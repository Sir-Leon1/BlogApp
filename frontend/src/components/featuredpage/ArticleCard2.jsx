import React from 'react';
import {useNavigate} from "react-router-dom";
import ReactMarkdown from "react-markdown";

const ArticleCard2 = ({ title, author, authorid, category, description, image, onClick }) => {

  const navigate = useNavigate();
  const handleAuthorClick = (e) => {
    e.stopPropagation();
    navigate(`/author/${authorid}`);
  }
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden" onClick={onClick}>
      <div className="md:w-1/3">
        <img className="w-full h-48 md:h-60 object-cover" src={image} alt={title} />
      </div>
      <div className="p-4 md:w-2/3">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600" onClick={handleAuthorClick}>{author} - {category}</p>
        <p className="mt-2 text-gray-700">
          <ReactMarkdown>{description}</ReactMarkdown>
        </p>
      </div>
    </div>
  );
};

export default ArticleCard2;