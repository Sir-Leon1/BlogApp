import React from 'react';
import AuthPage from "../loginReg/AuthForm.jsx";
import SignIn from "../loginReg/SignIn.jsx";
import AuthForm from "../loginReg/AuthForm.jsx";
import {Facebook, Github, Linkedin, Twitter} from "lucide-react";

const Footer = ({isloggedin}) => {
  const [isSignUp, setIsSignUp] = React.useState(false);

  return (
    <footer id="footer" className="border-t border-gray-200 py-8 mt-16 bg-gray-900">
      {isloggedin ? (
        <div/>
      ) : (<AuthForm  />)}
      <div id={"companylogo"} className="container mx-auto  px-4 flex justify-between items-center">
        <div className="flex-col flex text-white items-center mr-20">
        <img
          src="/pngwing.com%20(1).png"
          alt="Webterm" className="h-10 width-100%"/>
          Threaded Stories
        </div>
        <div id={"company-socials"} className="hidden sm:flex space-x-4 ml-30 items-center">
          <a href="https://facebook.com" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Facebook size={20} />
          </a>
          <a href="https://twitter.com" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Twitter size={20} />
          </a>
          <a href="https://instagram.com" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram"
                 className="h-4 w-4"/>
          </a>
          <a href="https://linkedin.com" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <Github size={20} />
          </a>
        </div>
        <p id={"companyCopyright"} className="text-sm justify-end text-gray-500">© All Rights Reserved 2024</p>
      </div>


    </footer>
  );
};

export default Footer;
