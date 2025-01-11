import React, {useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs";
import {Card, CardContent} from "../ui/card.jsx";
import {useProfile} from './ProfileContext';
import {useAuth} from "../../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import AlertPopup from "../universal/AlertPopup/AlertPopup.jsx";

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

const ProfilePosts = () => {
  const {posts} = useProfile();
  const [activeTab, setActiveTab] = useState("published");
  const {logout} = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertTitle, setAlertTitle] = useState('Success');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('handlingLogout');
    const result = await logout();
    if (result.status === 'success') {
      navigate('/login');
      window.location.reload();
    } else {
      setAlertType('error');
      setAlertTitle('Error');
      setAlertMessage('Logout Failed: ' + result.message);
      setShowAlert(true);
    }
  }

  return (
    <>
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="published">
          Published ({posts.published.length})
        </TabsTrigger>
        <TabsTrigger value="drafts">
          Drafts ({posts.drafts.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="published">
        {posts.published.map(post => (
          <PostCard key={post.id} post={post}/>
        ))}
      </TabsContent>

      <TabsContent value="drafts">
        {posts.drafts.map(post => (
          <PostCard key={post.id} post={post}/>
        ))}
      </TabsContent>
      <button
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-20 ml-4"
        onClick={() => handleLogout()}
      >Logout
      </button>
    </Tabs>
      {showAlert && (
        <AlertPopup
          type={alertType}
          title={alertTitle}
          message={alertMessage}
          position="top-center"
          duration={5000}
          onClose={() => setShowAlert(false)}
          />
      )}
      </>
  );
};

export default ProfilePosts;