import React from 'react';
import { useProfile } from './ProfileContext';

const ProfileInfo = () => {
  const { profile } = useProfile();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{profile.fullName}</h1>
        <p className="text-gray-500">@{profile.username}</p>
      </div>
      <p className="text-gray-700">{profile.bio}</p>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <span className="flex items-center gap-1">📍 {profile.location}</span>
        <span className="flex items-center gap-1">🌐 {profile.website}</span>
        <span className="flex items-center gap-1">📅 Joined {profile.joinDate}</span>
      </div>
    </div>
  );
};

export default ProfileInfo;