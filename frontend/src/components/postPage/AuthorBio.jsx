import React from 'react';
import {useNavigate} from "react-router-dom";

const AuthorBio = ({ username, authorId }) => {
  const navigate = useNavigate();

  const handleAuthorClick = (e) => {
    e.stopPropagation();
    navigate(`/author/${authorId}`);
  }

  //TODO: Add the authors image
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 border-t border-b">
      <div className="flex items-center">
        <img
          src="https://plus.unsplash.com/premium_photo-1671581559476-10b8a92ffb77?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww"
          alt="Author"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <h3 className="font-bold">{username}</h3>
          <p className="text-blue-500" onClick={handleAuthorClick}>View more posts</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;