import React from 'react';

const ArticleCard = ({title, author, category, description, image}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 rounded-lg hover:bg-gray-50">
      <div className="flex-1">
        <div className="mb-2">
          <span className="text-sm text-gray-600 uppercase">{category}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{description}</p>
        <div className="text-sm text-gray-500">
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