import React from 'react';

const CommentItem = ({ avatar, author, date, content }) => {
  return (
    <div className="flex gap-4 mb-8">
      <img src={avatar} alt={author} className="w-10 h-10 rounded-full" />
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

const CommentForm = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h3 className="text-xl font-bold mb-4">Leave a Reply</h3>
      <textarea
        className="w-full p-4 border rounded-lg mb-4"
        rows="4"
        placeholder="Write your comment..."
      />
      <button className="bg-pink-500 text-white px-6 py-2 rounded-lg">
        Post Comment
      </button>
    </div>
  );
};

const Comments = () => {
  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-6">Comments</h2>
      <CommentItem
        avatar="/avatar-1.jpg"
        author="Brian Johnson"
        date="April 5, 2019 at 9:53 am"
        content="I think, you might have just saved me a great deal of time"
      />
      {/* More comments */}
      <CommentForm />
    </section>
  );
};

export default Comments;