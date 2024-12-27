import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        username: "johndoe",
        fullName: "John Doe",
        email: "john.doe@example.com",
        bio: "Frontend developer passionate about creating beautiful and functional user interfaces.",
        location: "San Francisco, CA",
        website: "https://johndoe.dev",
        joinDate: "January 2024",
        socialLinks: {
            twitter: "johndoe",
            github: "johndoe",
            linkedin: "johndoe",
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

    // ... existing profile state and handlers ...

    return (
        <ProfileContext.Provider value={{
            profile,
            blogStats,
            posts,
            // ... existing context values ...
        }}>
            {children}
        </ProfileContext.Provider>
    );
};