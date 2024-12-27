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
          image="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D"
          title="Web page layout 101: website anatomy every designer needs to learn"
        />
        <RelatedPost
          image="https://plus.unsplash.com/premium_photo-1661382011487-cd3d6b1d9dff?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVzaWdufGVufDB8fDB8fHww"
          title="Web page layout 101: website anatomy every designer needs to learn"
        />
      </div>
    </section>
  );
};

export default RelatedPosts;