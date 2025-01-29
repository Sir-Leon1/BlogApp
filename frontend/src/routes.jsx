//Handles the routing of the application pages
import React from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginRegistrationPage from "./pages/LoginRegistrationPage.jsx";
import FeaturedPosts from "./pages/FeaturedPosts.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import TopicsPage from "./pages/TopicsPage.jsx";
import Author from "./pages/Author.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import AllReadingLists from "./pages/AllReadingLists.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import BlogEditor from "./pages/BlogEditor.jsx";

import NotFound from './pages/404';


import LandingPage from "@/pages/LandingPage.jsx";



function AppRoutes() {
  return (

    <Router>

      <AuthProvider>
        <Routes>
          <Route path="/welcome" element={<LandingPage/>}/>
          <Route path="/" element={<FeaturedPosts/>}/>
          <Route path="/featured" element={<FeaturedPosts/>}/>
          <Route path="/login" element={<LoginRegistrationPage/>}/>
          <Route path="/readinglists" element={<AllReadingLists/>}/>
          <Route path="/topics" element={<TopicsPage/>}/>
          <Route path="/topics/:topicId" element={<TopicsPage/>}/>
          <Route path="/topics/:topicId/:postId" element={<TopicsPage/>}/>
          <Route path="/author" element={<Author/>}/>
          <Route path="/author/:authorid" element={<Author/>}/>
          <Route path="/editor" element={<BlogEditor/>}/>
          <Route path="/article/:articleid" element={<BlogPost/>}/>
          <Route path="/profile" element={<UserProfile/>}/>
<Route element={<NotFound />} />
        </Routes>
      </AuthProvider>

    </Router>

  );
}

export default AppRoutes;