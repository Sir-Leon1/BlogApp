import React from 'react';
import { Twitter, Github, Linkedin, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useProfile } from './ProfileContext';

const ProfileSocial = () => {
    const { profile } = useProfile();

    const socialIcons = {
        twitter: Twitter,
        github: Github,
        linkedin: Linkedin,
        medium: BookOpen
    };

    return (
        <div className="flex gap-2 mb-6">
            {Object.entries(profile.socialLinks).map(([platform, username]) => {
                const Icon = socialIcons[platform];
                return (
                    <Button key={platform} variant="outline" size="icon">
                        <Icon className="h-4 w-4" />
                    </Button>
                );
            })}
        </div>
    );
};

export default ProfileSocial;