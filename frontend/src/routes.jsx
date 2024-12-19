//Handles the routing of the application pages
import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
/*import Home from "./pages/HomePage.jsx";
import SinglePost from "./pages/SinglePostPage.jsx";
import BlogPost from "./pages/BlogPostPage.jsx";
*/
import LoginRegistrationPage from "./pages/LoginRegistrationPage.jsx";
import FeaturedPosts from "./pages/FeaturedPosts.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import TopicsPage from "./pages/TopicsPage.jsx";
import Author from "./pages/Author.jsx";


function AppRoutes() {
  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<FeaturedPosts/>}/>
          <Route path="/featured" element={<FeaturedPosts/>}/>
          <Route path="/login" element={<LoginRegistrationPage/>}/>
          <Route path="/topics" element={<TopicsPage/>}/>
          <Route path="/topics/:topicId" element={<TopicsPage/>}/>
          <Route path="/topics/:topicId/:postId" element={<TopicsPage/>}/>
          <Route path="/authors" element={<Author/>}/>

        </Routes>
      </AuthProvider>

    </Router>

  );
}

export default AppRoutes;