//Handles the routing of the application pages
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginRegistrationPage from "./pages/LoginRegistrationPage.jsx";
import FeaturedPosts from "./pages/FeaturedPosts.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import TopicsPage from "./pages/TopicsPage.jsx";
import Author from "./pages/Author.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import AllReadingLists from "./pages/AllReadingLists.jsx";


function AppRoutes() {
  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<FeaturedPosts/>}/>
          <Route path="/featured" element={<FeaturedPosts/>}/>
          <Route path="/login" element={<LoginRegistrationPage/>}/>
          <Route path="/readinglists" element={<AllReadingLists/>}/>
          <Route path="/topics" element={<TopicsPage/>}/>
          <Route path="/topics/:topicId" element={<TopicsPage/>}/>
          <Route path="/topics/:topicId/:postId" element={<TopicsPage/>}/>
          <Route path="/authors" element={<Author/>}/>
          <Route path="/authors/:authorId" element={<Author/>}/>
          <Route path="/blogtestpost" element={<BlogPost/>}/>

        </Routes>
      </AuthProvider>

    </Router>

  );
}

export default AppRoutes;