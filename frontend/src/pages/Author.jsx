import React, {useEffect, useState} from 'react';
import AuthorProfile from '../components/author/AuthorProfile';
import BlogPost from '../components/author/BlogPost';
import Sidebar from '../components/author/SideBar';
import Pagination from '../components/author/Pagination';
import Newsletter from '../components/author/NewsLetter';
import Layout from "../components/layout/Layout.jsx";
import {getSpecificBlogAuthor, getAuthorsBlogList} from '../services/blogApi';
import {useNavigate, useParams} from "react-router-dom";
import { ClipLoader } from "react-spinners";

const BlogDetailPage = () => {
  const { authorid } = useParams();
  const [loading, setLoading] = useState(true)
  console.log(authorid);
  const [postAuthor, setPostAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  let image;
  console.log(postAuthor);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getAuthorsBlogList(authorid);
      console.log(response.data);
      setPosts(response.data);
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    console.log('Fetching post author');
    const fetchPostAuthor = async () => {
      setLoading(true);
      const response = await getSpecificBlogAuthor(authorid);
      setLoading(false);
      if (response.error) {
        navigate('/404');
        return;
      }
      setPostAuthor(response.data);
    }
    fetchPostAuthor();
  }, [authorid]);

  console.log(postAuthor);
  console.log(posts);
  //TODO : The profile pic retreival will change once the profile manager is implemented
  if (postAuthor && postAuthor.profile.imageData) {
    image = `data:${postAuthor.profile.imageContentType};base64,${postAuthor.profile.imageData.toString('base64')}`;
    console.log(image);
  }
  //const imageSource = URL.createObjectURL(image);


  return (
    <Layout>
      {loading ? (
          <div className="flex justify-center items-center h-screen">
            <ClipLoader size={50} color="#123abc" loading={loading}/>
          </div>
        ) : (
        <div className="container mx-auto px-4 py-8 pt-0">
          {postAuthor && <AuthorProfile
            image={postAuthor.image}
          name={postAuthor.name}
          bio={postAuthor.profile.bio}
          socialLinks={postAuthor.social_links}
        />
        }
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-1">
            {posts.map((post, index) => (
              <BlogPost key={index} {...post} articleId={post.id}/>
            ))}
            {/**<Pagination />*/}
          </div>
          { postAuthor && <Sidebar posts={posts}
                   socialLinks={postAuthor.social_links}/> }
        </div>
        <Newsletter />
      </div>
        )}
    </Layout>
  );
};

export default BlogDetailPage;