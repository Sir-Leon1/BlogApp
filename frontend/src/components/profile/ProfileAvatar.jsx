import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";
import { useProfile } from './ProfileContext';

const ProfileAvatar = ({ isEditing }) => {
  const { profile } = useProfile();

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
        >
          <Camera className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ProfileAvatar;