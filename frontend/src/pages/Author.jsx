import React from 'react';
import AuthorProfile from '../components/author/AuthorProfile';
import BlogPost from '../components/author/BlogPost';
import Sidebar from '../components/author/SideBar';
import Pagination from '../components/author/Pagination';
import Newsletter from '../components/author/NewsLetter';
import Layout from "../components/layout/Layout.jsx";

const BlogDetailPage = () => {
  const posts = [
    {
      image: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVyYmFufGVufDB8fDB8fHww",
      category: "RESOURCE",
      title: "How to Migrate from Wix to WordPress (Complete Guide)",
      author: "TOMAS LAURINAVICIUS"
    },
    // More posts...
  ];

  return (
    <Layout>
    <div className="container mx-auto px-4 py-8 pt-0">
      <AuthorProfile />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-1">
          {posts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
          <Pagination />
        </div>
        <Sidebar />
      </div>
      <Newsletter />
    </div>
    </Layout>
  );
};

export default BlogDetailPage;