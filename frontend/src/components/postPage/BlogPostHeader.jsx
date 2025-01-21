import React from 'react';

const BlogPostHeader = ( { title, views, category, likes, image }) => {
  return (
    <header className="max-w-3xl mx-auto px-4 pt-8">
      <h1 className="text-3xl font-bold mb-4">
        {title}
      </h1>
      <img className=" mb-4 w-full h-80 object-cover " alt={"blog Image"} src={image}>
      </img>
      <div className="flex items-center text-sm text-gray-500">
        <span>VIEWS: {views}</span>
        <span className="mx-2">•</span>
        <span>{category}</span>
        <span className="mx-2">•</span>
        <span>LIKES: {likes}</span>
      </div>
    </header>
  );
};

export default BlogPostHeader;