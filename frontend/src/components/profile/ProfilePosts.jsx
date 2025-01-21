import React, {useState} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs";
import {Card, CardContent} from "../ui/card.jsx";
import {useProfile} from './ProfileContext';
import {useAuth} from "../../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import AlertPopup from "../universal/AlertPopup/AlertPopup.jsx";



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