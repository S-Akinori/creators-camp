'use client';

import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Button from "../../atoms/Button";
import { http } from '@/app/lib/http';
import { csrf } from '@/app/lib/csrf';
import { useEffect, useState } from 'react';

interface Props {
    materialId: number;
    defaultLiked: boolean;
    likeId?: number | null;
}

const LikeButton = ({materialId, defaultLiked, likeId = null}: Props) => {
    const [liked, setLiked] = useState(defaultLiked);
    const [currentLikeId, setCurrentLikeId] = useState<number | null>(likeId);
    console.log(currentLikeId)
    const onClick = async () => {
        await csrf()
        try {
            if(liked) {
                const res = await http.delete(`/materials/${materialId}/likes/${currentLikeId}`);
                setLiked(false);
                setCurrentLikeId(null);
            } else {
                const res = await http.post(`/materials/${materialId}/likes`);
                setLiked(true);     
                setCurrentLikeId(res.data.id);
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Button color={liked ? 'main' : 'main-cont'} className="mx-2 mb-4" onClick={onClick}>
            {liked ? 'いいね済み' : 'この素材をいいね！'} <ThumbUpOffAltIcon className={liked ? 'fill-main-cont' : 'fill-main'} />
        </Button>
    );
}

export default LikeButton;