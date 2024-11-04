'use client'
import { Material } from '@/app/types/Material';
import React, { use, useEffect, useState } from 'react';
import Container from '../../Container';
import clsx from 'clsx';
import { reggaeOne } from '@/app/fonts';
import Thumbnail from '../../atoms/Thumbnail';
import PreviewButton from '../PreviewButton';
import LikeButton from '../LikeButton';
import FavoriteButton from '../FavoriteButton';
import { identifyFileTypeByExtension } from '@/app/lib/identifyFileTypeByExtension';
import Link from 'next/link';
import ShareButtons from '../ShareButtons';
import { getUser } from '@/app/lib/auth';
import Image from 'next/image';
import FollowButton from '../FollowButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Button from '../../atoms/Button';

interface MaterialPreviewProps {
    material: {
        name: string
        description: string
        file: File | string
        image: File | string
        images: File[]
        tags: string[]
        permission: number
        is_ai_generated: number
    },
    thumbnail: {
        file: File
        url: string
    },
    images: {
        file: File
        url: string
    }[]
}

const MaterialPreview: React.FC<MaterialPreviewProps> = async ({ material, images, thumbnail }: MaterialPreviewProps) => {
    const user = await getUser();
    if (!user) {
        return null;
    }

    return (
        <div>
            <div className="bg-white p-4 relative">
                <h1 className={clsx(["text-main font-bold text-3xl mb-4 mr-12", reggaeOne.className])}>{material.name}</h1>
                {material.is_ai_generated == 1 && (
                    <div className="absolute top-4 right-4 rounded-full border-2 border-main text-main font-bold w-12 aspect-square text-center leading-tight">
                        AI<br />
                        利用
                    </div>
                )}
                <div className="relative border-main border-2">
                    <Thumbnail src={thumbnail.url} alt={material.name} />
                </div>
                <div className="flex mt-4">
                    {images && images.map((image, index) => (
                        <div key={index} className="p-2 md:w-1/3">
                            <Thumbnail src={image.url} />
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-end mt-4 text-sm">
                    <Button color='main-cont' className="mx-2 mb-4">いいね！ <ThumbUpOffAltIcon className='fill-main' /></Button>
                    <Button color='accent-cont' className="mx-2 mb-4">お気に入り！ <StarBorderIcon className='fill-accent' /></Button>
                </div>
                <div>
                    <p className="text-lg">{material.description}</p>
                    <div>
                        {material.tags.map((tag, index) => (
                            <span key={index} className="text-main">#{tag}</span>
                        ))}
                    </div>
                </div>
                <div className={reggaeOne.className}>
                    {material.permission == 0 && (
                        <Button className="mt-8 w-full py-4">ダウンロード</Button>
                    )}
                    {material.permission == 1 && (
                        <>
                            <Button className="mt-8 w-full py-4">クリエイターへ承認依頼する</Button>
                            <p className="text-red-600">この素材はクリエイターへの承認依頼が必要です</p>
                        </>
                    )}
                </div>
                <div className="mt-4">
                    <ShareButtons />
                </div>
            </div>
        </div>
    )
}

export default MaterialPreview;