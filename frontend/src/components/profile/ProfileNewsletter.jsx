import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProfile } from './ProfileContext';

const ProfileNewsletter = () => {
    const { profile } = useProfile();

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Newsletter</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600 mb-4">{profile.newsletter.description}</p>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        {profile.newsletter.subscribers.toLocaleString()} subscribers
                    </p>
                    <Button>Subscribe</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProfileNewsletter;