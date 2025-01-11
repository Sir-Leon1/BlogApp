import React, {useEffect, useState} from 'react';
import {Card} from '../../components/ui/card';
import Header from '../components/BlogEditorPage/Header.jsx';
import CoverImage from '../components/BlogEditorPage/CoverImage.jsx';
import Tags from '../components/BlogEditorPage/Tags.jsx';
import ContentEditor from '../components/BlogEditorPage/ContentEditor.jsx';
import Layout from "../components/layout/Layout.jsx";
import CategorySelector from '../components/BlogEditorPage/CategorySelector.jsx';
import {createBlog} from "../services/blogApi.js";
import MarkdownBlogEditor from "../components/BlogEditorPage/MarkdownBlogEditor.jsx";

const BlogEditor = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    tags: [],
    coverImage: null,
    category: '',
    isPreview: false
  });

  const handleImageChange = (imageData) => {
    setPost(prev => ({
      ...prev,
      coverImage: imageData
    }));
  };

  const handleImageRemove = () => {
    setPost(prev => ({
      ...prev,
      coverImage: null
    }));
  };

  const handleTagAdd = (newTag) => {
    setPost(prev => ({
      ...prev,
      tags: [...prev.tags, newTag]
    }));
  };

  const handleTagRemove = (tagToRemove) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCreateBlog = async () => {
    console.log("Publishing site")
    const authorId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('tags', JSON.stringify(post.tags));
    formData.append('category', post.category);
    if (post.coverImage) {
      post.coverImage.url ? formData.append('imageUrl', post.coverImage.url) :
      formData.append('coverImage', post.coverImage.data);
    }

    try {
      const response = await createBlog(formData, authorId);
      if (response.status === 201) {
        // Handle successful blog creation (e.g., navigate to the blog page)
        console.log('Blog created successfully');
      } else {
        // Handle errors
        console.error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-950">
        <Header
          isPreview={post.isPreview}
          onTogglePreview={() => setPost(prev => ({...prev, isPreview: !prev.isPreview}))}
          onPublish={() => handleCreateBlog()}
        />

        <main className="max-w-5xl mx-auto px-4 py-4 sm:py-6 md:py-8">
          <div className="bg-white rounded-lg shadow-sm">
            <CoverImage
              coverImage={post.coverImage}
              onImageChange={handleImageChange}
              onImageRemove={handleImageRemove}
            />

            <div className="p-4 sm:p-6">
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={post.title}
                  onChange={(e) => setPost(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                  className="w-full text-2xl sm:text-3xl md:text-4xl font-bold px-3 sm:px-4 py-2 border-0 focus:ring-0 focus:outline-none"
                />

                <CategorySelector
                  selectedCategory={post.category}
                  onCategoryChange={(category) => setPost(prev => ({
                    ...prev,
                    category
                  }))}
                />

                <Tags
                  tags={post.tags}
                  onTagAdd={handleTagAdd}
                  onTagRemove={handleTagRemove}
                />

                <MarkdownBlogEditor
                  initialContent={post.content}
                  onContentChange={(newContent) => setPost(prev => ({
                    ...prev,
                    content: newContent
                  }))
                  }
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default BlogEditor;
