import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi, registerApi } from "../services/authApi.js";
import LoadingSpinner from "../components/universal/LoadingSpinner/loadingSpinner";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [access_token, setAccess] = useState(null);
  const [refresh_token, setRefresh] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to log in (get JWT from server)
  const login = async (email, password) => {
    setLoading(true);
    const response = await loginApi(email, password);
    setLoading(false);

    if (response && (response.status === 200 || response.status === 201)) {
      console.log(response.status);
      const data = response.data;
      const { access_token, refresh_token } = data;  // Assuming the server returns a token and user info

      // Store token and user in state/localStorage
      setAccess(access_token);
      setRefresh(refresh_token);
      localStorage.setItem('access_token', access_token);// Store token
      localStorage.setItem('refresh_token', refresh_token);  // Store user info

      return { status: 'success', data };
    } else {
      return { status: 'error', message: 'Incorrect Login Details'};
    }
  };

  //Function to register create a new user
  const register = async (username, email, password) => {
    const response = await registerApi(username, email, password);
    if (response && (response.status === 200 || response.status === 201)) {
      const data = response.data;
      const { access_token, refresh_token } = data;  // Assuming the server returns a token and user info

      // Store token and user in state/localStorage
      setAccess(access_token);
      setRefresh(refresh_token);
      localStorage.setItem('access_token', access_token);// Store token
      localStorage.setItem('refresh_token', refresh_token);  // Store user info

      return { status: 'success', data };
    } else {
      return { status: 'error', message: response.error };
  }}

  // Function to log out
  const logout = () => {
    setLoading(true);
    setAccess(null);
    setRefresh(null);
    localStorage.removeItem('access_token');  // Clear token from localStorage
    localStorage.removeItem('refresh_token');   // Clear user data

    setLoading(false);

    return { status: 'success' };
  };

  // Check localStorage to persist login status
  useEffect(() => {
    const storedAccess = localStorage.getItem('access_token');
    const storedRefresh = localStorage.getItem('refresh_token');
    if (storedAccess && storedRefresh) {
      setAccess(storedAccess);
      setRefresh(storedRefresh);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ refresh_token, access_token, login, logout, register }}>
      {loading && <LoadingSpinner />}
      {children}
    </AuthContext.Provider>
  );
};