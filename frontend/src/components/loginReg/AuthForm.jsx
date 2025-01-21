import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from "../../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import AlertPopup from "../universal/AlertPopup/AlertPopup.jsx";

const AuthForm = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertTitle, setAlertTitle] = useState('Success');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const result = await login(formData.email, formData.password);
      if (result.status === 'success') {
        navigate('/');
        window.location.reload();
      } else {
        //alert('Login Failed: ' + result.message);
        setAlertType('error');
        setAlertTitle('Error');
        setAlertMessage('Login Failed: ' + result.message);
        setShowAlert(true);
      }
    } else {
      const result = await register(formData.username, formData.email, formData.password);
      if (result.status === 'success') {
        navigate('/');
        window.location.reload();
      } else {
        alert('Registration Failed: ' + result.message);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex justify-between flex-col md:flex-row bg-grey-500 shadow-md rounded-lg overflow-hidden md:m-20 m-4">
      <div className="md:w-1/3">
        <img className="w-full h-48 md:h-full object-cover" alt="image"
             src="https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D"/>
      </div>
      <main className="flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-grey text-white rounded-lg overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold ">
                {isLogin ? 'Login' : 'Create an account'}
              </h2>
              <p>
                {isLogin
                  ? 'Enter your credentials to access your account'
                  : 'Sign up to start creating amazing blog posts'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500"/>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="johndoe"
                      className="text-black pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500"/>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className="text-black pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500"/>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="text-black pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
                <ArrowRight className="ml-2 h-4 w-4"/>
              </button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-500">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  {isLogin ? 'Create account' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <div className="hidden md:flex md:w-1/3">
        <img className="w-full h-48 md:h-full object-cover" alt="image"
             src="https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8fDA%3D"/>
      </div>
      {showAlert && (
        <AlertPopup
          type={alertType}
          title={alertTitle}
          message={alertMessage}
          position="top-center"
          duration={5000}
          onClose={() => setShowAlert(false)}
        />)}
    </div>
  );
};

export default AuthForm;