import React, { useState } from 'react';
import Header from '../Header/Header';
import CoverImage from '../CoverImage/CoverImage';
import Tags from '../Tags/Tags';
import ContentEditor from '../ContentEditor/ContentEditor';
import CategorySelector from '../CategorySelector/CategorySelector';

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isPreview={post.isPreview}
        onTogglePreview={() => setPost(prev => ({ ...prev, isPreview: !prev.isPreview }))}
        onPublish={() => console.log('Publishing...')}
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

              <ContentEditor
                content={post.content}
                isPreview={post.isPreview}
                onChange={(e) => setPost(prev => ({
                  ...prev,
                  content: e.target.value
                }))}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogEditor;