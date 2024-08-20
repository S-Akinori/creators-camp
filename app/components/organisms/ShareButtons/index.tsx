'use client'
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    FacebookShareButton,
    TwitterShareButton,
    LineShareButton,
    InstapaperShareButton,
    FacebookIcon,
    TwitterIcon,
    LineIcon,
    InstapaperIcon,
    XIcon
  } from "react-share";


const ShareButtons: React.FC = () => {
    const pathname = usePathname();
    const url = 'https://recreators-camp.com' + pathname;
    
    return (
        <div className="flex justify-center space-x-4">
            <FacebookShareButton url={url}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={url}>
                <XIcon size={32} round />
            </TwitterShareButton>
            <LineShareButton url={url}>
                <LineIcon size={32} round />
            </LineShareButton>
        </div>
    )
}

export default ShareButtons;