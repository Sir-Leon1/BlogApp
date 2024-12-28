import React from 'react';
import { CardContent } from "../ui/card.jsx";
import { Button } from '../ui/button';
import { X, Check } from "lucide-react";
import { useProfile } from './ProfileContext';

const ProfileActions = ({ isEditing, setIsEditing }) => {
  const { saveChanges, cancelChanges } = useProfile();

  const handleSave = () => {
    saveChanges();
    setIsEditing(false);
  };

  const handleCancel = () => {
    cancelChanges();
    setIsEditing(false);
  };

  return (
    <CardContent className="px-6 pb-6">
      <div className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Check className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>
    </CardContent>
  );
};

export default ProfileActions;