import React, {useState} from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";
import { useProfile } from './ProfileContext';
import ProfilePhotoUpload from "./ProfilePhotoUpload.jsx";

const ProfileAvatar = ({ isEditing }) => {
  const { profile } = useProfile();
  const [showPhotoEditBox, setShowPhotoEditBox]= useState(false);

  const handleProfileUploadClose = () => {
    setShowPhotoEditBox(false);
  }

  return (
    <div className="relative -mt-20 mb-4">
      <Avatar className="w-32 h-32 ">
        <AvatarImage src={profile.image} alt={profile.fullName} />
        <AvatarFallback>
          {profile.fullName}
        </AvatarFallback>
      </Avatar>
      {isEditing && (
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-0 right-0 rounded-full"
          onClick={() => setShowPhotoEditBox(true)}
        >
          <Camera className="w-4 h-4" />
        </Button>
      )}

      {showPhotoEditBox && (
        <ProfilePhotoUpload onClose={handleProfileUploadClose}/>
      )}
    </div>
  );
};

export default ProfileAvatar;