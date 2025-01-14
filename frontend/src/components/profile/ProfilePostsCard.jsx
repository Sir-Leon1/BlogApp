import {Card, CardContent} from "../ui/card.jsx";
import React from "react";

const PostCard = ({post}) => (
  <Card className="mb-4">
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
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

export default PostCard