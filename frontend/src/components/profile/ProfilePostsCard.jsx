import {Card, CardContent} from "../ui/card.jsx";
import {Pencil, Trash2, X} from "lucide-react";
import React, {useState} from "react";
import BlogContentRender from "../BlogEditorPage/BlogContentRender.jsx";
import ReactMarkdown from "react-markdown";
import {addHistory} from "../../services/userApi.js";
import {useNavigate} from "react-router-dom";

const DeleteModal = ({isOpen, onClose, onConfirm, postTitle}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Delete Post</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5"/>
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{postTitle}"? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const PostCard = ({post, onEdit, onDelete}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(post);
    setShowDeleteModal(false);
  };

  const handleArticleClick = (id) => {
    navigate(`/article/${id}`);
  }

  const excerpt = () => {
    let brief = "Catch up on this and more of your amazing blogs...";
    if (post.content) {
      console.log("Running cut" + post.content);
      brief = post.content.split(" ").slice(0, 15).join(" ") + (post.content.split(" ").length > 15 ? "..." : "")
      console.log(brief);
      return brief;
    }
    return brief;
  }

  return (
    <>
      <Card className="mb-4 relative">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="relative bg-purple-900 text-white rounded-lg p-8"
                 style={{
                   backgroundImage: `url(${post.image})`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 }}
            />
            <div className={"flex pl-3 justify-end"} onClick={() => handleArticleClick(post.id)}>
              <h3 className="text-lg font-semibold">{post.title}</h3>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(post)}
                className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Edit post"
              >
                <Pencil className="w-4 h-4"/>
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Delete post"
              >
                <Trash2 className="w-4 h-4"/>
              </button>
            </div>
          </div>

          {excerpt() && (
            <>
              <p className="text-gray-600 mb-2">
                <ReactMarkdown>{excerpt()}</ReactMarkdown>
              </p>
              <div className="flex items-center text-sm text-gray-500 gap-4">
                <span>{post.publishDate}</span>
                <span>5min read</span>
                <span>254 likes</span>
                <span>20 comments</span>
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

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        postTitle={post.title}
      />
    </>
  );
};

export default PostCard;
