import React, {createContext, useContext, useEffect, useState} from 'react';
import {profileUpdate, user} from "../../services/userApi.js";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {

    useEffect( () => {
        const fetchUserProfile = async () => {
            const userId = localStorage.getItem("userId");
            const response = await user(userId);
            const socialLinks = response.data.socialLinks
            const socialLinksObject = socialLinks.reduce((acc, link) => {
                const key = link.platform.toLowerCase();
                acc[key] = link.url;
                return acc;
            }, {});
            setProfile( prev => {
                return ({
                    ...prev,
                    image: response.data.image,
                    username: response.data.username,
                    fullName: response.data.fullName,
                    location: response.data.location,
                    website: response.data.website,
                    //categories: response.data.categories,
                    email: response.data.email,
                    bio: response.data.bio,
                    socialLinks: socialLinksObject,

                    //TODO: Add other fields
                });
            })
        }
        fetchUserProfile();
    }, [])


    const [profile, setProfile] = useState({
        image: "",
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

    const updateEditedProfile = (updatedProfile) => {
        setProfile(updatedProfile);
    };

    const saveChanges = () => {
        //setProfile(editedProfile);
        handleUpdateUserInfo();
    };

    const cancelChanges = () => {
        setEditedProfile(profile);
    };

    const handleUpdateUserInfo = async () => {
        console.log("Saving User info");
        const userId = localStorage.getItem("userId");
        console.log(profile.socialLinks);
        const socialLinks = profile.socialLinks;
        const socialLinksArray = Object.entries(socialLinks).map(([platform, url]) => ({
            platform: platform.charAt(0).toUpperCase() + platform.slice(1), // Capitalize the first letter
            url: url,
        }));
        console.log(socialLinksArray);
        const formData = new FormData();
        formData.append('username', profile.username);
        formData.append('fullName', profile.fullName);
        formData.append('email', profile.email);
        formData.append('bio', profile.bio);
        formData.append('location', profile.location);
        formData.append('website', profile.website);
        formData.append('socialLinks', JSON.stringify(socialLinksArray));
        formData.append('categories', profile.categories);
        formData.append('image', profile.image);

        try {
            const response = await profileUpdate(formData, userId);
            if (response.status === 201) {
                console.log('Info updated');
            } else {
                console.error("Failed to update info");
            }
        } catch (error) {
            console.error('Error updating use info: ', error);
        }

    }


    return (
        <ProfileContext.Provider value={{
            profile,
            blogStats,
            posts,
            editedProfile,
            handleInputChangeProfile,
            handleInputChangeEdited,
            updateEditedProfile,
            saveChanges,
            cancelChanges
        }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);