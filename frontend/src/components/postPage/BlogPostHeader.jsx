import React from 'react';

const BlogPostHeader = () => {
  return (
    <header className="max-w-3xl mx-auto px-4 pt-8">
      <h1 className="text-3xl font-bold mb-4">
        10 Reasons to Build Your Website with WP Page Builder
      </h1>
      <p className="text-gray-600 mb-4">
        People's quest for creating websites has really taken off at face one of site development. While, with the capability of visual page building some creating websites has become a lot more fun nowadays for many developers.
      </p>
      <div className="flex items-center text-sm text-gray-500">
        <span>VIEWS: 245</span>
        <span className="mx-2">•</span>
        <span>ARTICLE</span>
        <span className="mx-2">•</span>
        <span>READ: 7 MINS</span>
      </div>
    </header>
  );
};

export default BlogPostHeader;