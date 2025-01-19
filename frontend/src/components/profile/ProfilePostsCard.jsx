import { Card, CardContent } from "../ui/card.jsx";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

const PostCard = ({ post, onEdit, onDelete }) => (
  <Card className="mb-4 relative">
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{post.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(post)}
            className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Edit post"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(post)}
            className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Delete post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {post.excerpt && (
        <>
          <p className="text-gray-600 mb-2">{post.excerpt}</p>
          <div className="flex items-center text-sm text-gray-500 gap-4">
            <span>{post.publishDate}</span>
            <span>{post.readTime} read</span>
            <span>{post.likes} likes</span>
            <span>{post.comments} comments</span>
          </div>
        </>
      )}
      
      {post.completion && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-blue-500 rounded"
              style={{width: `${post.completion}%`}}
            />
          </div>
          <span className="text-sm text-gray-500">
            {post.completion}%
          </span>
        </div>
      )}
    </CardContent>
  </Card>
);

export default PostCard;
