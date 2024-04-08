'use client'

interface Props {
    src: string;
}

const VideoPlayer = ({src}: Props) => {
    return (
        <div>
            <video src={src} controls></video>
        </div>
    )
}

export default VideoPlayer;