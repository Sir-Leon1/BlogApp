import React from 'react';
import { Input } from "../ui/input";
import { TextArea } from "../ui/textArea.jsx";
import { useProfile } from './ProfileContext';

const ProfileForm = () => {
  const { editedProfile, handleInputChange } = useProfile();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="fullName"
          value={editedProfile.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
        />
        <Input
          name="username"
          value={editedProfile.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <Input
          name="email"
          value={editedProfile.email}
          onChange={handleInputChange}
          placeholder="Email"
          type="email"
        />
        <Input
          name="website"
          value={editedProfile.website}
          onChange={handleInputChange}
          placeholder="Website"
        />
        <Input
          name="location"
          value={editedProfile.location}
          onChange={handleInputChange}
          placeholder="Location"
        />
      </div>
      <TextArea
        name="bio"
        value={editedProfile.bio}
        onChange={handleInputChange}
        placeholder="Bio"
        className="h-24"
      />
    </div>
  );
};

export default ProfileForm;