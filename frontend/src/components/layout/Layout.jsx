import React, {useEffect} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {useAuth} from "../../contexts/AuthContext.jsx";

const Layout = ({children}) => {
  const {logout} = useAuth();
  const [isloggedin, setIsloggedin] = React.useState(false);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setIsloggedin(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar isloggedin={isloggedin} onLogout={logout}/>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer isloggedin={isloggedin}/>
    </div>
  );
};

export default Layout;