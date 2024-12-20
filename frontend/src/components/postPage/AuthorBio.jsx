import React from 'react';

const AuthorBio = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 border-t border-b">
      <div className="flex items-center">
        <img
          src="/author-avatar.jpg"
          alt="Author"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <h3 className="font-bold">TOMAS LAURINAVICIUS</h3>
          <a href="#" className="text-blue-500">View more posts</a>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;