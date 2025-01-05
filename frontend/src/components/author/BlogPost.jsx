import React from 'react';
import ArticleLinkWrapper from "../postPage/BlogLinkWrapper.jsx";

const BlogPost = ({ image, category, title, author, articleid }) => {
  return (
    <ArticleLinkWrapper articleId={articleId}>
    <article className="mb-12">
      <img src={image} alt={title} className="md:w-full md:h-80 w-full h-40 object-cover rounded-lg" />
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span>BY {author}</span>
        <span className="mx-2">IN</span>
        <span className="uppercase">{category}</span>
      </div>
      <h2 className="text-xl font-bold hover:text-pink-500">
        {title}
      </h2>
    </article>
    </ArticleLinkWrapper>
  );
};

export default BlogPost;