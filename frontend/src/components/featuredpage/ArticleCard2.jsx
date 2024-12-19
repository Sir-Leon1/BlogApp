import React from 'react';

const ArticleCard2 = ({ title, author, category, description, image }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden">
      <div className="md:w-1/3">
        <img className="w-full h-48 md:h-60 object-cover" src={image} alt={title} />
      </div>
      <div className="p-4 md:w-2/3">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{author} - {category}</p>
        <p className="mt-2 text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ArticleCard2;