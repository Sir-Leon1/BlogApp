import React from 'react';
import { Card, CardContent } from "../ui/card.jsx";
import { useProfile } from './ProfileContext';

const ProfileStats = () => {
    const { blogStats } = useProfile();

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {Object.entries(blogStats).map(([key, value]) => (
                <Card key={key}>
                    <CardContent className="p-4 text-center">
                        <p className="text-2xl font-bold">
                            {value.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                            {key}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ProfileStats;