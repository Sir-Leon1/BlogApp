import React from "react";
import ReactMarkdown from "react-markdown";
import "./BlogPreview.css"; // For GitHub-style markdown

const BlogPreview = ({ markdownContent }) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default BlogPreview;
