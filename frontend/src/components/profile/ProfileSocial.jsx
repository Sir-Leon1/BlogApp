import React from 'react';
import { Twitter, Github, Linkedin, BookOpen, Facebook } from 'lucide-react';
import { Button } from "../ui/button";
import { useProfile } from './ProfileContext';

const ProfileSocial = ({ isEditing }) => {
    const { profile } = useProfile();

    const socialIcons = {
        twitter: Twitter,
        github: Github,
        linkedin: Linkedin,
        medium: BookOpen,
        facebook: Facebook,
    };

    return (
        <div className="flex gap-2 mb-6">
            {Object.entries(profile.socialLinks).map(([platform, link]) => {
                const Icon = socialIcons[platform];
                return (
                  <a href={link} target="_blank" rel="noreferrer">
                    <Button key={platform} variant="outline" size="icon">
                        <Icon className="h-4 w-4" />
                    </Button>
                      </a>
                );
            })}
        </div>
    );
};

export default ProfileSocial;