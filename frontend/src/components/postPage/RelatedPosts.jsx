import React from 'react';

const RelatedPost = ({ image, title }) => {
  return (
    <div className="flex-1">
      <img src={image} alt={title} className="w-full rounded-lg mb-4" />
      <h3 className="font-bold hover:text-pink-500">
        <a href="#">{title}</a>
      </h3>
    </div>
  );
};

const RelatedPosts = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-6">You might also like...</h2>
      <div className="flex gap-6">
        <RelatedPost
          image="/related-1.jpg"
          title="Web page layout 101: website anatomy every designer needs to learn"
        />
        <RelatedPost
          image="/related-2.jpg"
          title="Web page layout 101: website anatomy every designer needs to learn"
        />
      </div>
    </section>
  );
};

export default RelatedPosts;