import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import ProfileActions from './ProfileActions';
import ProfileStats from './ProfileStats';
import ProfileCategories from './ProfileCategories';
import ProfileSocial from './ProfileSocial';
import ProfileNewsletter from './ProfileNewsletter';
import ProfilePosts from './ProfilePosts';

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <Card className="max-w-3xl mx-auto">
                <ProfileHeader isEditing={isEditing} />
                <div className="px-6">
                    <ProfileStats />
                    <ProfileCategories />
                    <ProfileSocial />
                    <ProfileContent isEditing={isEditing} />
                    <ProfileActions
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                    />
                </div>
            </Card>
            <div className="max-w-3xl mx-auto mt-8">
                <ProfileNewsletter />
                <ProfilePosts />
            </div>
        </div>
    );
};

export default UserProfile;