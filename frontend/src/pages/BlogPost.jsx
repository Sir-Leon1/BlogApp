import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import BlogPostHeader from '../components/postPage/BlogPostHeader';
import SocialShare from '../components/postPage/SocialShare';
import BlogContent from '../components/postPage/BlogContent';
import AuthorBio from '../components/postPage/AuthorBio';
import RelatedPosts from '../components/postPage/RelatedPosts';
import Comments from '../components/postPage/Comments';
import ProgressBar from '../components/postPage/ProgressBar';
import TableOfContents from '../components/postPage/TableOfContents';
import Layout from "../components/layout/Layout.jsx";
import SocialShareSmll from "../components/postPage/SocialShareSmll.jsx";
import {useParams} from "react-router-dom";
import {specificBlog} from "../services/blogApi.js";
import {ClipLoader} from "react-spinners";
import BlogContentRender from "../components/BlogEditorPage/BlogContentRender.jsx";

const BlogPostPage = () => {
  const {articleid} = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to load the page (e.g., API call or assets loading)
    const timer = setTimeout(() => setLoading(false), 2000); // Simulated 2-second load
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    console.log(articleid);
    const fetchPost = async () => {
      const response = await specificBlog(articleid);
      setData(response.data);
      console.log(response);
    }
    fetchPost();
  }, [])


  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color="#123abc" loading={loading}/>
        </div>
      ) : (
        < div className="min-h-screen bg-white rounded">
          < ProgressBar />
            < motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5}}
            >
              <BlogPostHeader
                title={data.title}
                views={data.views}
                category={data.category}
                likes={data.likes}
                image={data.image}
              />
              {/*<SocialShare/>*/}

              <BlogContentRender markdownContent={data.content}/>
              {/*<SocialShareSmll/>*/}
              <AuthorBio username={data.authorId.username} authorId={data.authorId._id}/>
              {/*<RelatedPosts/>
              <Comments comments={data.comments} blogId={articleid}/>*/}
            </motion.div>
        </div>
        )}
    </Layout>
  );
};

export default BlogPostPage;