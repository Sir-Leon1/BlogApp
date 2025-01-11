import React from 'react';
import {Github, Twitter, Facebook, Linkedin, Link} from 'lucide-react';

const AuthorProfile = ({image, name, bio, socialLinks}) => {

  const getIcon = (platform) => {
  switch (platform.toLowerCase()) {
    case 'github':
      return <Github size={20} />;
    case 'twitter':
      return <Twitter size={20} />;
    case 'facebook':
      return <Facebook size={20} />;
    case 'linkedin':
      return <Linkedin size={20} />;
    case 'link':
      return <Link size={20} />;
    default:
      return <Link size={20} />;
  }
};

  return (
    <div className="text-center py-8 pt-0 mt-0">
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h1 className="text-xl text-white font-bold mb-2">{name}</h1>
      <p className="text-gray-50 mb-4">{bio}</p>
      <div className="flex justify-center space-x-3">
        { socialLinks.map((link, index) => (
          <a key={index} href={link.url} className="text-gray-400 hover:text-gray-600">
            {getIcon(link.platform)}
          </a>
        ))}

      </div>
    </div>
  )
    ;
};

export default AuthorProfile;
