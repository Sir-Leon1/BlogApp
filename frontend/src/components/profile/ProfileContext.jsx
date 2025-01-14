import React, {createContext, useContext, useEffect, useState} from 'react';
import {user} from "../../services/userApi.js";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {

    useEffect( () => {
        const fetchUserProfile = async () => {
            const userId = localStorage.getItem("userId");
            const response = await user(userId);
            setProfile( prev => {
                return ({
                    ...prev,
                    username: response.data.username,
                    email: response.data.email,
                    bio: response.data.bio,
                    //socialLinks: response.data.socialLinks,
                    //TODO: Add other fields
                });
            })
        }
        fetchUserProfile();
    }, [])


    const [profile, setProfile] = useState({
        username: "",
        fullName: "John Doe",
        email: "john.doe@example.com",
        bio: "Frontend developer passionate about creating beautiful and functional user interfaces.",
        location: "San Francisco, CA",
        website: "https://johndoe.dev",
        joinDate: "January 2024",
        socialLinks: {
            twitter: "https://twitter.com/?mx=1",
            github: "https://github.com/",
            linkedin: "https://www.linkedin.com/",
            medium: "johndoe"
        },
        categories: ["Web Development", "UI/UX", "React", "JavaScript"],
        newsletter: {
            subscribers: 1250,
            description: "Weekly insights on web development and design"
        }
    });

    const [blogStats] = useState({
        posts: 42,
        views: 150320,
        likes: 2840,
        comments: 728,
        shares: 456
    });

    const [posts] = useState({
        published: [
            {
                id: 1,
                title: "Getting Started with React Hooks",
                excerpt: "Learn the basics of React Hooks and how to use them effectively...",
                publishDate: "2024-01-15",
                readTime: "5 min",
                likes: 245,
                comments: 28
            },
            // Add more posts...
        ],
        drafts: [
            {
                id: 101,
                title: "Advanced TypeScript Patterns",
                lastEdited: "2024-02-01",
                completion: 80
            },
            // Add more drafts...
        ]
    });

    const [editedProfile, setEditedProfile] = useState(profile);

    const handleInputChangeProfile = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));
        handleInputChangeEdited(e);
    };

    const handleInputChangeEdited = (e) => {
        const { name, value } = e.target;
        setEditedProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const updateProfile = (updatedProfile) => {
        setEditedProfile(updatedProfile);
    };

    const saveChanges = () => {
        setProfile(editedProfile);
    };

    const cancelChanges = () => {
        setEditedProfile(profile);
    };


    return (
        <ProfileContext.Provider value={{
            profile,
            blogStats,
            posts,
            editedProfile,
            handleInputChangeProfile,
            handleInputChangeEdited,
            updateProfile,
            saveChanges,
            cancelChanges
        }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);