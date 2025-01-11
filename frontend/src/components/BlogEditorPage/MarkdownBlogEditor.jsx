import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import DOMPurify from 'dompurify';
import remarkGfm from 'remark-gfm';
import { Alert, AlertDescription } from '../../../components/ui/alert';

const MarkdownBlogEditor = ({ initialContent = '', onContentChange }) => {
  const [content, setContent] = useState(initialContent);
  const [isPreview, setIsPreview] = useState(false);
  const [hasMarkdown, setHasMarkdown] = useState(false);

  // Check if content contains markdown syntax
  const checkForMarkdown = (text) => {
    const markdownPatterns = [
      /[#]{1,6}\s/, // headers
      /(\*\*|__)[^\*\n]+(\*\*|__)/, // bold
      /(\*|_)[^\*\n]+(\*|_)/, // italic
      /!\[.*?\]\(.*?\)/, // images
      /\[.*?\]\(.*?\)/, // links
      /```[\s\S]*?```/, // code blocks
      /^\s*[-*+]\s/, // unordered lists
      /^\s*\d+\.\s/, // ordered lists
      /^\s*>[^\n]+/, // blockquotes
    ];

    return markdownPatterns.some(pattern => pattern.test(text));
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setHasMarkdown(checkForMarkdown(newContent));
    onContentChange?.(newContent);
  };

  // Sanitize HTML if content doesn't contain markdown
  const getSanitizedContent = () => {
    if (!hasMarkdown) {
      // Preserve line breaks and spacing for non-markdown content
      return content.split('\n').map((line, i) => (
        <React.Fragment key={i}>
          {DOMPurify.sanitize(line)}
          {i !== content.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <button
            onClick={() => setIsPreview(false)}
            className={`px-4 py-2 rounded ${!isPreview ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            Edit
          </button>
          <button
            onClick={() => setIsPreview(true)}
            className={`px-4 py-2 rounded ${isPreview ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
          >
            Preview
          </button>
        </div>
        {hasMarkdown && (
          <span className="text-sm text-gray-500">
            Markdown formatting detected
          </span>
        )}
      </div>

      {!isPreview ? (
        <div className="relative">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Write your blog post here... You can use Markdown formatting!"
            className="w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] px-3 sm:px p-4  rounded-lg   focus:outline-none font-mono"
          />
          <div className="absolute bottom-2 right-2 text-sm text-gray-400">
            {content.length} characters
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          {hasMarkdown ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className="prose max-w-none"
            >
              {content}
            </ReactMarkdown>
          ) : (
            <div className="prose max-w-none">
              {getSanitizedContent()}
            </div>
          )}
        </div>
      )}

      {content && !hasMarkdown && (
        <Alert>
          <AlertDescription>
            No Markdown formatting detected. Your content will be displayed as plain text with preserved formatting.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default MarkdownBlogEditor;