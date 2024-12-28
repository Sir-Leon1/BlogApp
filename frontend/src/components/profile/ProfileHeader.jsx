import React from 'react';
import { CardHeader } from "../ui/card.jsx";
import ProfileCover from './ProfileCover';
import ProfileAvatar from './ProfileAvatar';
import {ProfileProvider} from "./ProfileContext.jsx";

const ProfileHeader = ({ isEditing }) => {
  return (
    <CardHeader className="relative">
      <ProfileCover />
      <div className="px-6 pb-6">
        <ProfileProvider>
        <ProfileAvatar isEditing={isEditing} />
        </ProfileProvider>
      </div>
    </CardHeader>
  );
};

export default ProfileHeader;