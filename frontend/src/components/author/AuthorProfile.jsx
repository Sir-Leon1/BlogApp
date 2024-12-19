import React from 'react';
import { Github, Twitter, Facebook, Linkedin, Link } from 'lucide-react';

const AuthorProfile = () => {
  return (
    <div className="text-center py-8 pt-0 mt-0">
      <img
        src="https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
        alt="TOMAS LAURINAVICIUS"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h1 className="text-xl font-bold mb-2">TOMAS LAURINAVICIUS</h1>
      <p className="text-gray-600 mb-4">Hi, my name is Daniel. I'm the CTO here at Kinsta.</p>
      <div className="flex justify-center space-x-3">
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <Github size={20} />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <Twitter size={20} />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <Facebook size={20} />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <Linkedin size={20} />
        </a>
        <a href="#" className="text-gray-400 hover:text-gray-600">
          <Link size={20} />
        </a>
      </div>
    </div>
  );
};

export default AuthorProfile;