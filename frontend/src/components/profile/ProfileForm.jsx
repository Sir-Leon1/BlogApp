import React, {useEffect, useState} from 'react';
import { Input } from "../ui/input";
import { TextArea } from "../ui/textArea.jsx";
import { useProfile } from './ProfileContext';

const SocialSelector = () => {
  const { profile, editedProfile, updateEditedProfile } = useProfile(); // Assume `profile.socialLinks` contains the social links data
  const [selectedPlatform, setSelectedPlatform] = useState("facebook"); // Default to Facebook
  const [urlInput, setUrlInput] = useState(profile.socialLinks?.facebook || ""); // Default URL for platform

  const platforms = [
    { value: "facebook", label: "Facebook" },
    { value: "twitter", label: "Twitter" },
    { value: "instagram", label: "Instagram" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "github", label: "GitHub" },
  ];

  const handlePlatformChange = (e) => {
    const platform = e.target.value;
    setSelectedPlatform(platform); // Update selected platform
    setUrlInput(profile.socialLinks?.[platform] || ""); // Update the URL input based on the current context
  };

  const handleUrlChange = (e) => {
    setUrlInput(e.target.value);
  };

  const handleSave = () => {
    let obj = profile.socialLinks;
    Object.assign(obj, { [selectedPlatform]: urlInput})
    console.log(obj);
  };

  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Update Social Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Dropdown Selector */}
          <div className={" w-full "}>
            <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
              Select Platform
            </label>
            <select
              id="platform"
              value={selectedPlatform}
              onChange={handlePlatformChange}
              className="mt-1 px-4 py-3 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {platforms.map((platform) => (
                <option key={platform.value} value={platform.value}>
                  {platform.label}
                </option>
              ))}
            </select>
          </div>

          {/* URL Input */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              URL
            </label>
            <Input
              id="url"
              type="text"
              value={urlInput}
              onChange={handleUrlChange}
              placeholder="Enter URL"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
    </div>
  );
};



const ProfileForm = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setKey((prevKey) => prevKey + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const { editedProfile, handleInputChangeProfile,  profile } = useProfile();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="fullName"
          value={profile.fullName}
          onChange={handleInputChangeProfile}
          placeholder="Full Name"
        />
        <Input
          name="username"
          value={profile.username}
          onChange={handleInputChangeProfile}
          placeholder="Username"
        />
        <Input
          name="email"
          value={profile.email}
          onChange={handleInputChangeProfile}
          placeholder="Email"
          type="email"
        />
        <Input
          name="website"
          value={profile.website}
          onChange={handleInputChangeProfile}
          placeholder="Website"
        />
        <Input
          name="location"
          value={profile.location}
          onChange={handleInputChangeProfile}
          placeholder="Location"
        />

      </div>
      <SocialSelector/>
      <TextArea
        name="bio"
        value={editedProfile.bio}
        onChange={handleInputChangeProfile}
        placeholder="Bio"
        className="h-24"
      />
    </div>
  );
};

export default ProfileForm;