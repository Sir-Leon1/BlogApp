//Handles the routing of the application pages
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
/*import Home from "./pages/HomePage.jsx";
import LoginRegistration from "./pages/LoginRegistrationPage.jsx";
import SinglePost from "./pages/SinglePostPage.jsx";
import BlogPost from "./pages/BlogPostPage.jsx";
*/
import LoginRegistrationPage from "./pages/LoginRegistrationPage.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";

//import { AuthProvider } from "./contexts/AuthContext";

function AppRoutes() {
  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginRegistrationPage/>}/>

          <Route path="/login" element={<LoginRegistrationPage/>}/>

        </Routes>
      </AuthProvider>

    </Router>

  );
}

export default AppRoutes;