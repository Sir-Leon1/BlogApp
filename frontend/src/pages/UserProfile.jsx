import React, {useEffect, useState} from 'react';
import {Card} from '../components/ui/card';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileContent from '../components/profile/ProfileContent';
import ProfileActions from '../components/profile/ProfileActions';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileCategories from '../components/profile/ProfileCategories';
import ProfileSocial from '../components/profile/ProfileSocial';
import ProfileNewsletter from '../components/profile/ProfileNewsletter';
import ProfilePosts from '../components/profile/ProfilePosts';
import {ProfileProvider, useProfile} from "../components/profile/ProfileContext.jsx";
import Layout from "../components/layout/Layout.jsx";
import ProfileTabs from "../components/profile/ProfileTabs.jsx";
import PostCard from "../components/profile/ProfilePostsCard.jsx"
import ProfilePhotoUpload from "../components/profile/ProfilePhotoUpload.jsx";
import {useAuth} from "../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {getAuthorsBlogList} from "../services/blogApi.js";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {logout} = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchPosts = async () => {
      const response = await getAuthorsBlogList(userId);
      console.log(response.data);
      setPosts(response.data);
    }
    fetchPosts();
  }, []);

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

  const tabs = [

    {
      label: 'Published',
      content: <div id={"some"}>{posts.map((post, index) => (
          <PostCard key={index} post={post}/>
        ))}</div>
    },
    {
      label: 'Settings',
      content: <div  className={"text-white"}>Account Settings card</div>
    }
  ];

  return (
    <Layout>
    <div >
      <ProfileProvider>
        <Card className="max-w-3xl mx-auto">
          <ProfileHeader isEditing={isEditing}/>
          <div className="px-6">

            <ProfileStats/>

            <ProfileCategories/>
            <ProfileContent isEditing={isEditing}/>
            <ProfileActions
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </div>
        </Card>
        <div className="max-w-3xl mx-auto mt-8">
          <ProfileNewsletter/>
          <ProfileTabs tabs={tabs} defaultTab={0}/>
          <button
        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-20 ml-4"
        onClick={() => handleLogout()}
      >Logout
      </button>
        </div>
      </ProfileProvider>
    </div>
    </Layout>
  )
    ;
};

export default UserProfile;
