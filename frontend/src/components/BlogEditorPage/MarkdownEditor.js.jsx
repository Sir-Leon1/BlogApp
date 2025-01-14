import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import {delay} from "framer-motion";

const mdParser = new MarkdownIt();

const MarkdownEditor = ({ onChange }) => {
  const [content, setContent] = useState("");

  const handleEditorChange = async ({ text }) => {
    console.log(text);
    setContent(text);
  };

  return (
    <div className=" mx-auto space-y-6">
      <div className="flex justify-between items-center">

        {/**Todo link to the publish button and the onSave event handling*/}
      </div>

      <div className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-lg">
        <MdEditor
          value={content}
          style={{ height: "700px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </div>


    </div>
  );
};

export default MarkdownEditor;