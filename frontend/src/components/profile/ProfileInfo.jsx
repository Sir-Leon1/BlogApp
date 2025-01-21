import React, {useEffect, useState} from 'react';
import { useProfile } from './ProfileContext';
import ProfileSocial from "./ProfileSocial.jsx";
import {ClipLoader} from "react-spinners";

const ProfileInfo = () => {
  const { profile } = useProfile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile.fullName !== 'John Doe') {
      setLoading(false);
    }
  }, [profile.fullName]);

  return (
    <>
    {loading ? (
        <div className="flex justify-center items-center h-30">
          <ClipLoader size={50} color="#123abc" loading={loading}/>
        </div>
      ) : (
    <div className="space-y-4">
      <ProfileSocial/>
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
      )}
    </>
  );
};

export default ProfileInfo;