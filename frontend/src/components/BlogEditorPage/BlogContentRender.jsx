import React from "react";
import ReactMarkdown from "react-markdown";
import "./BlogPreview.css"; // For GitHub-style markdown

const BlogContentRender = ({ markdownContent }) => {
  return (
    <div className="markdown-body " style={{
      maxWidth: '48rem/* 768px */', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#fff', color: '#000'
    }}>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default BlogContentRender;
