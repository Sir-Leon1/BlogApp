import React from 'react';
import { motion } from 'framer-motion';
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

const BlogPostPage = () => {
  return (
    <Layout>
    <div className="min-h-screen bg-white">
      <ProgressBar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BlogPostHeader />
        <SocialShare />

        <BlogContent />
        <SocialShareSmll />
        <AuthorBio />
        <RelatedPosts />
        <Comments />
      </motion.div>
    </div>
    </Layout>
  );
};

export default BlogPostPage;