import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./MarkdownEditor.css"; // For custom styling

const mdParser = new MarkdownIt();

const MarkdownEditor = ({ onSave }) => {
  const [content, setContent] = useState("");

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
  };

  return (
    <div>
      <h2>Write Your Blog</h2>
      <MdEditor
        value={content}
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
      <button onClick={handleSave}>Save Blog</button>
    </div>
  );
};

export default MarkdownEditor;
