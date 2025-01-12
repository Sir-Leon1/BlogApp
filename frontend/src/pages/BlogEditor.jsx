import React, {useEffect, useState} from 'react';
import {Card} from '../../components/ui/card';
import Header from '../components/BlogEditorPage/Header.jsx';
import CoverImage from '../components/BlogEditorPage/CoverImage.jsx';
import Tags from '../components/BlogEditorPage/Tags.jsx';
import ContentEditor from '../components/BlogEditorPage/ContentEditor.jsx';
import Layout from "../components/layout/Layout.jsx";
import CategorySelector from '../components/BlogEditorPage/CategorySelector.jsx';
import {createBlog} from "../services/blogApi.js";
//import MarkdownEditor from "../components/BlogEditorPage/MarkdownEditor.js.jsx";
//import BlogContentRender from "../components/BlogEditorPage/BlogContentRender.jsx";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

const BlogEditor = () => {
  const [content, setContent] = useState("");

  const [post, setPost] = useState({
    title: '',
    content: '',
    tags: [],
    coverImage: null,
    category: '',
    isPreview: false
  });

  const handleEditorChange = (text) => {
    setPost(prev => ({
      ...prev,
      content: text.text
    }));
    setContent(text.text);
  };

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

        <main className="sm:w-auto w-full mx-auto  py-4 sm:py-6 md:py-8">
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

                <div>

                  <div className=" mx-auto space-y-6">
                    <div className="flex justify-between items-center">

                      {/**Todo link to the publish button and the onSave event handling*/}
                    </div>

                    <div className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                      <MdEditor
                        value={content}
                        style={{height: "700px"}}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                      />
                    </div>


                  </div>
                  {/**<h2>Preview</h2>
                  <BlogContentRender markdownContent={post.content}/>*/}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default BlogEditor;
