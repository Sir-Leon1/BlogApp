import React from 'react';
import ProfileInfo from './ProfileInfo';
import ProfileForm from './ProfileForm';

const ProfileContent = ({ isEditing }) => (
  <div className="px-6 pb-6">
    {isEditing ? <ProfileForm /> : <ProfileInfo />}
  </div>
);

export default ProfileContent;