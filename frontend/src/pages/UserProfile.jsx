import React, {useState} from 'react';
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

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [posts] = useState({
    published: [
      {
        id: 1,
        title: "Getting Started with React Hooks",
        excerpt: "Learn the basics of React Hooks and how to use them effectively...",
        publishDate: "2024-01-15",
        readTime: "5 min",
        likes: 245,
        comments: 28
      },
      // Add more posts...
    ],
    drafts: [
      {
        id: 101,
        title: "Advanced TypeScript Patterns",
        lastEdited: "2024-02-01",
        completion: 80
      },
      // Add more drafts...
    ]
  });

  const tabs = [

    {
      label: 'Published',
      content: <div id={"some"}>{posts.published.map(post => (
          <PostCard key={post.id} post={post}/>
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
        </div>
      </ProfileProvider>
    </div>
    </Layout>
  )
    ;
};

export default UserProfile;