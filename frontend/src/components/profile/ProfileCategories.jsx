import React from 'react';
import { Badge } from "@/components/ui/badge";
import { useProfile } from './ProfileContext';

const ProfileCategories = () => {
    const { profile } = useProfile();

    return (
        <div className="flex flex-wrap gap-2 mb-6">
            {profile.categories.map(category => (
                <Badge key={category} variant="secondary">
                    {category}
                </Badge>
            ))}
        </div>
    );
};

export default ProfileCategories;