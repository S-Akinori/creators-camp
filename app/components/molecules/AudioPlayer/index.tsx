'use client'

import { PauseCircle, PlayCircle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement>{
    src: string;
}

const MusicPlayer = ({src, ...props}: Props) => {
  const [playState, setPlayState] = useState<'play' | 'pause' | 'stop'>('stop');
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => {
    audioRef?.current?.play();
    setPlayState('play');
  };

  const pause = () => {
    audioRef?.current?.pause();
    setPlayState('pause');
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayState('stop');
    }
  };

  console.log('src', src);

  return (
    <div {...props}>
      <audio ref={audioRef} src={src} preload="auto" />
      <div className='w-40 bg-gray-300 rounded-full text-center'>
        {playState === 'play' && <IconButton onClick={pause}><PauseCircle className='text-3xl' /></IconButton>}
        {playState === 'pause' && <IconButton onClick={play}><PlayCircle className='text-3xl' /> </IconButton>}
        {playState === 'stop' && <IconButton onClick={play}><PlayCircle className='text-3xl' /></IconButton>}
      </div>
    </div>
  );
}

export default MusicPlayer;
