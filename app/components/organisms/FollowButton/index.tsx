'use client'
import React, { useState, useEffect } from 'react';
import Button from '../../atoms/Button';
import { http } from '@/app/lib/http';
import { csrf } from '@/app/lib/csrf';

interface FollowButtonProps {
    userId: number;
    isFollowing: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, isFollowing: initialIsFollowing }) => {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    const handleFollow = async () => {
        await csrf()
        if (isFollowing) {
            await http.post(`/users/${userId}/unfollow`);
        } else {
            await http.post(`/users/${userId}/follow`);
        }
        setIsFollowing(!isFollowing);
    };

    return (
        <Button color={isFollowing ? 'main' : 'main-cont'} onClick={handleFollow}>
            {isFollowing ? 'フォロー解除' : 'フォローする'}
        </Button>
    );
};

export default FollowButton;
