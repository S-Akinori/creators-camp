'use client';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from "../../atoms/Button";
import { http } from '@/app/lib/http';
import { csrf } from '@/app/lib/csrf';
import { useEffect, useState } from 'react';

interface Props {
    materialId: number;
    defaultFavorited: boolean;
    favoriteId?: number | null;
}

const FavoriteButton = ({materialId, defaultFavorited, favoriteId = null}: Props) => {
    const [favorited, setFavorited] = useState(defaultFavorited);
    const [currentFavoriteId, setCurrentFavoriteId] = useState<number | null>(favoriteId);
    console.log(currentFavoriteId)
    const onClick = async () => {
        await csrf()
        try {
            if(favorited) {
                const res = await http.delete(`/materials/${materialId}/favorites/${currentFavoriteId}`);
                setFavorited(false);
                setCurrentFavoriteId(null);
            } else {
                const res = await http.post(`/materials/${materialId}/favorites`);
                setFavorited(true);     
                setCurrentFavoriteId(res.data.id);
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Button color={favorited ? 'accent' : 'accent-cont'} className="mx-2 mb-4" onClick={onClick}>
            {favorited ? 'お気に入り済' : 'この素材をお気に入り！'} <StarBorderIcon className={favorited ? 'fill-accent-cont' : 'fill-accent'} />
        </Button>
    );
}

export default FavoriteButton;