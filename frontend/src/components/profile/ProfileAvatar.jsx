import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";
import { useProfile } from './ProfileContext';

const ProfileAvatar = ({ isEditing }) => {
  const { profile } = useProfile();

  return (
    <div className="relative -mt-20 mb-4">
      <Avatar className="w-32 h-32 border-4 border-white">
        <AvatarImage src="https://images.unsplash.com/photo-1734452465230-f571caa4d7d5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2M3x8fGVufDB8fHx8fA%3D%3D" alt={profile.fullName} />
        <AvatarFallback>
          {profile.fullName.split(' ').map(n => n[0]).join('')}
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