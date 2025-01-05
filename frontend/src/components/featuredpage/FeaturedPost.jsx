import React from 'react';
import {useNavigate} from "react-router-dom";

const FeaturedPost = ({title, author, authorid, category, description}) => {
  const navigate = useNavigate();

  const handleAuthorClick = (e) => {
    e.stopPropagation();
    navigate(`/author/${authorid}`);
  }

  return (
    <div className="relative bg-purple-900 text-white rounded-lg p-8"
         style={{
           backgroundImage: 'url(https://images.unsplash.com/photo-1658662882873-df79fb55df4c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwd2F0ZXJ8ZW58MHx8MHx8fDA%3D)',
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}
    >
      <div className={"absolute inset-0 bg-purple-900 opacity-75 rounded-lg"}></div>
      <div className="relative z-10">
        <div className="mb-4">
          <span className="text-sm" onClick={handleAuthorClick}>BY {author}</span>
          <span className="mx-2">•</span>
          <span className="text-sm uppercase">{category}</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default FeaturedPost;