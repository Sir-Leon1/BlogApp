import React, {useEffect, useState} from 'react';
import AuthorProfile from '../components/author/AuthorProfile';
import BlogPost from '../components/author/BlogPost';
import Sidebar from '../components/author/SideBar';
import Pagination from '../components/author/Pagination';
import Newsletter from '../components/author/NewsLetter';
import Layout from "../components/layout/Layout.jsx";
import {getSpecificBlogAuthor, getAuthorsBlogList} from '../services/blogApi';
import {useNavigate, useParams} from "react-router-dom";

const BlogDetailPage = () => {
  const { authorid } = useParams();
  /** TODO: Remove this hard coded data
  const posts = [
    {
      image: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVyYmFufGVufDB8fDB8fHww",
      category: "RESOURCE",
      title: "How to Migrate from Wix to WordPress (Complete Guide)",
      author: "TOMAS LAURINAVICIUS"
    },
    // More posts...
  ];
  const postAuthor = {
    image: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVyYmFufGVufDB8fDB8fHww",
    name: "TOMAS LAURINAVICIUS",
    bio: "Tomas Laurinavicius is a lifestyle entrepreneur and blogger from Lithuania. He writes about habits, lifestyle design, and entrepreneurship. Tomas is best known for his lifestyle blog and book 100 Days of Wisdom.",
    socialLinks: {
      githublink: "#",
      twitterlink: "#",
      facebooklink: "#",
      linkedinlink: "#",
      profilelink: "#"
  }};
  */
  const [postAuthor, setPostAuthor] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getAuthorsBlogList(authorid);
      setPosts(response.data);
    }
    fetchPosts().then(r => console.log(r));
  }, [authorid]);

  useEffect(() => {
    const fetchPostAuthor = async () => {
      const response = await getSpecificBlogAuthor(authorid);
      if (response.error) {
        navigate('/404');
        return;
      }
      setPostAuthor(response.data);
    }
    fetchPostAuthor().then(r => console.log(r));
  }, [authorid])


  return (
    <Layout>
    <div className="container mx-auto px-4 py-8 pt-0">
      <AuthorProfile
        image={postAuthor.image}
        name={postAuthor.name}
        bio={postAuthor.bio}
        socialLinks={postAuthor.socialLinks}
      />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:flex-1">
          {posts.map((post, index) => (
            <BlogPost key={index} {...post} articleid={post.id}/>
          ))}
          <Pagination />
        </div>
        <Sidebar posts={posts}
        socialLinks={postAuthor.socialLinks}/>
      </div>
      <Newsletter />
    </div>
    </Layout>
  );
};

export default BlogDetailPage;