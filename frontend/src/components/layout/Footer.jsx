import React from 'react';
import AuthPage from "../loginReg/AuthForm.jsx";
import SignIn from "../loginReg/SignIn.jsx";
import AuthForm from "../loginReg/AuthForm.jsx";
import TestComponent from "../../contexts/AuthContext.test.jsx";

const Footer = ({isloggedin}) => {
  const [isSignUp, setIsSignUp] = React.useState(false);

  return (
    <footer id="footer" className="border-t border-gray-200 py-8 mt-16 bg-gray-900">
      {isloggedin ? (
        <div/>
      ) : (<AuthForm  />)}
      <div id={"companylogo"} className="container mx-auto px-4 flex justify-between items-center">
        <img
          src="data:image/png;base64,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"
          alt="Webterm" className="h-6"/>
        <div id={"company-socials"} className="hidden sm:flex space-x-4 ml-32">
          <a href="https://facebook.com" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook"
                 className="h-4 w-4"/>
          </a>
          <a href="https://twitter.com" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <img src="https://cdn.mos.cms.futurecdn.net/z3bn6deaxmrjmQHNEkpcZE-970-80.jpg.webp" alt="Twitter"
                 className="h-4 w-4"/>
          </a>
          <a href="https://instagram.com" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram"
                 className="h-4 w-4"/>
          </a>
          <a href="https://linkedin.com" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" alt="LinkedIn"
                 className="h-4 w-4"/>
          </a>
          <a href="https://github.com" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub"
                 className="h-4 w-4"/>
          </a>
        </div>
        <p id={"companyCopyright"} className="text-sm justify-end text-gray-500">© All Rights Reserved 2024</p>
      </div>


    </footer>
  );
};

export default Footer;