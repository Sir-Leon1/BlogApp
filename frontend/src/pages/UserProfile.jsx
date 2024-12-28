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
import {ProfileProvider} from "../components/profile/ProfileContext.jsx";
import Layout from "../components/layout/Layout.jsx";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Layout>
    <div >
      <ProfileProvider>
        <Card className="max-w-3xl mx-auto">
          <ProfileHeader isEditing={isEditing}/>
          <div className="px-6">

            <ProfileStats/>

            <ProfileCategories/>
            <ProfileSocial/>
            <ProfileContent isEditing={isEditing}/>
            <ProfileActions
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </div>
        </Card>
        <div className="max-w-3xl mx-auto mt-8">
          <ProfileNewsletter/>
          <ProfilePosts/>
        </div>
      </ProfileProvider>
    </div>
    </Layout>
  )
    ;
};

export default UserProfile;