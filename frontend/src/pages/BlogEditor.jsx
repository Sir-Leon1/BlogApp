// src/components/BlogEditor/BlogEditor.js
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Header from '../components/universal/Header';
import CoverImage from '../components/universal/CoverImage';
import Tags from '../components/universal/Tags';
import ContentEditor from '../components/universal/ContentEditor';

const BlogEditor = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    tags: [],
    coverImage: null,
    isPreview: false
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setPost(prev => ({
        ...prev,
        coverImage: file
      }));
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isPreview={post.isPreview}
        onTogglePreview={() => setPost(prev => ({ ...prev, isPreview: !prev.isPreview }))}
        onPublish={() => console.log('Publishing...')}
      />

      <main className="max-w-5xl mx-auto px-4 py-4 sm:py-6 md:py-8">
        <Card>
          <CoverImage
            coverImage={post.coverImage}
            onImageChange={handleImageChange}
            onImageRemove={handleImageRemove}
          />

          <div className="p-4 sm:p-6">
            <input
              type="text"
              placeholder="Blog Title"
              value={post.title}
              onChange={(e) => setPost(prev => ({
                ...prev,
                title: e.target.value
              }))}
              className="w-full text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-3 sm:px-4 py-2 border-0 focus:ring-0 focus:outline-none"
            />

            <Tags
              tags={post.tags}
              onTagAdd={handleTagAdd}
              onTagRemove={handleTagRemove}
            />

            <ContentEditor
              content={post.content}
              isPreview={post.isPreview}
              onChange={(e) => setPost(prev => ({
                ...prev,
                content: e.target.value
              }))}
            />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default BlogEditor;
