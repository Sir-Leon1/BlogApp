import React from 'react';
import { Github, Twitter, Facebook, Linkedin, Link } from 'lucide-react';

const AuthorProfile = ({image, name, bio, socialLinks}) => {
  return (
    <div className="text-center py-8 pt-0 mt-0">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h1 className="text-xl font-bold mb-2">{name}</h1>
      <p className="text-gray-600 mb-4">{bio}</p>
      <div className="flex justify-center space-x-3">
        <a href={socialLinks.githublink} className="text-gray-400 hover:text-gray-600">
          <Github size={20} />
        </a>
        <a href={socialLinks.twitterlink} className="text-gray-400 hover:text-gray-600">
          <Twitter size={20} />
        </a>
        <a href={socialLinks.facebooklink} className="text-gray-400 hover:text-gray-600">
          <Facebook size={20} />
        </a>
        <a href={socialLinks.linkedinlink} className="text-gray-400 hover:text-gray-600">
          <Linkedin size={20} />
        </a>
        <a href={socialLinks.profilelink} className="text-gray-400 hover:text-gray-600">
          <Link size={20} />
        </a>
      </div>
    </div>
  );
};

export default AuthorProfile;