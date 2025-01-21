import React, {useState} from 'react';
import {createComment} from "../../services/commentsApi.js";

const CommentItem = ({avatar, author, date, content}) => {
  return (
    <div className="flex gap-4 mb-8">
      <img src={avatar} alt={author} className="w-10 h-10 rounded-full"/>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold">{author}</span>
          <span className="text-gray-500 text-sm">{date}</span>
          <button className="text-pink-500 text-sm">Reply</button>
        </div>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

const CommentForm = ({blogId}) => {
    const [comment, setComment] = useState({
      blogId: blogId,
      content: '',
    })

    const handleCommentSubmit = async () => {
      console.log("Creating Comment");
      const authorId = localStorage.getItem("userId");
      try {
        const response = await createComment(comment, authorId);
        if (response.status === 201) {
          console.log('Comment created successfully');
        } else {
          // Handle errors
          console.error('Failed to create comment');
        }
      } catch (error) {
        console.error('Error creating comment:', error);
      }

    }

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h3 className="text-xl font-bold mb-4">Leave a Reply</h3>
        <textarea
          className="w-full p-4 border rounded-lg mb-4"
          rows="4"
          placeholder="Write your comment..."
          value={comment.title}
          onChange={(e) => setComment({
              content: e.target.value
            }
          )
          }
        />
        <button className="bg-pink-500 text-white px-6 py-2 rounded-lg"
                onClick={handleCommentSubmit}
        >
          Post Comment
        </button>
      </div>
    );
  };

const Comments = ({comments, blogId}) => {

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-6">Comments</h2>
      {comments.map((comment) => (
        <CommentItem
          avatar="https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D"
          author={comment.authorId.username}
          date="April 5, 2019 at 9:53 am"
          content={comment.content}
        />
      ))}
      <CommentForm blogId={blogId}/>
    </section>
  );
};

export default Comments;