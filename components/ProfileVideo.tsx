import React, { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import { Video } from '../types';

interface IProps {
    post: Video;
}
const ProfileVideo: NextPage<IProps> = ({ post }) => {
    const [isHover, setIsHover] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const onVideoPress = () => {
        if(playing) {
            videoRef?.current?.pause();
            setPlaying(false);
        } else {
            videoRef?.current?.play();
            setPlaying(true);
        }
    }

 useEffect(() => {
   if(videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
   }
   }, [isVideoMuted])
     

    return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-1">
       <div>
          
       </div>
          <div className="lg:ml-10 flex gap-1 relative mt-0">
             <div 
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="rounded-xl">
                <Link href={`/detail/${post._id}`}>
                  <div>

                    <video
                       loop
                       ref={videoRef}
                       className="lg:w-[430px] h-[100px] md:h-[200px] lg:h-[220px] w-[120px] rounded cursor-pointer bg-black mb-4"
                       src={post.video.asset.url}
                    >
                     
                    </video>
                    
                    </div>
                </Link>
                {isHover && (
                    <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-5 lg:justify-between w-[100px] md:w-[50px] p-3">
                        {
                            playing ? (
                                <button onClick={onVideoPress}>
                                 <BsFillPauseFill className="text-[#F51997] text-2xl lg:text-4xl"/>   
                                </button>
                            ) : (
                                <button onClick={onVideoPress}>
                                    <BsFillPlayFill className="text-[#F51997] text-2xl lg:text-4xl"/>
                                </button>
                            )}
                             {isVideoMuted ? (
                                <button onClick={() => setIsVideoMuted(false)}>
                                 <HiVolumeOff className="text-[#F51997] text-2xl lg:text-4xl"/>   
                                </button>
                            ) : (
                                <button onClick={() => setIsVideoMuted(true)}>
                                    <HiVolumeUp className="text-[#F51997] text-2xl lg:text-4xl"/>
                                </button>
                            )}
                    </div>
                  )}
             </div>
          </div>
    </div>
  )
}

export default ProfileVideo