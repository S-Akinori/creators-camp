'use client'

import { http } from "@/app/lib/http";
import { useState } from "react";
import Button from "../../atoms/Button";
import MusicPlayer from "../../molecules/AudioPlayer";

interface Props {
    id: number | string
    fileType: string
    className?: string
}

const PreviewButton = ({id, fileType, className}: Props) => {
    const [url, setUrl] = useState<string | null>(null);
    const onClick = async () => {
        const res = await http.get(`/materials/${id}/download`, {
            responseType: 'blob'
        });
        console.log(res.data)
        const blob = new Blob([res.data], {type: res.data.type});
        const url = URL.createObjectURL(blob)
        setUrl(url)
    }
    return (
        <>
            {!url && <Button onClick={onClick} className={className}>プレビューを見る</Button>}
            {(url && fileType === 'video') && <video className="absolute top-0 left-0 w-full h-full" src={url} controls />}
            {(url && fileType === 'music') && <MusicPlayer className="mb-4" src={url} />}
        </>
    )
}

export default PreviewButton;