import React, { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill, BsChatText, BsSave2 } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import { Video } from '../types';
import { AiOutlineHeart } from 'react-icons/ai';


interface IProps {
    post: Video;
}
const VideoCard: NextPage<IProps> = ({ post}: IProps) => {
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
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
       <div>
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded mb-0">
            <div className="md:w-16 md:h-16 w-8 h-8">
              <Link href={`/profile/${post.postedBy._id}`}>
                <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                />
                </>
              </Link>
            </div>
              <div>
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className="flex items-center gap-2 mb-0">
                    <p className="flex gap-2 items-center md:text-md font-bold text-primary">{post.postedBy.userName}  {' '} <GoVerified className="text-blue-400 text-md"/></p>
                    <p className="font-medium text-xs text-gray-500 hidden md:block lowercase">@{post.postedBy.userName.replace(' ','_')}</p>
                </div>
              </Link>
              </div>
          </div>
       </div>
          <div className="lg:ml-20 mr-5 ml-5 flex gap-2 relative mt-0">
             <div 
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="rounded-3xl">
                <Link href={`/detail/${post._id}`}>
                
                  <div>
                  <p className="px-1 m-2 mr-0 md:text-md text-md text-primary text-justify justify-center">{post.caption}</p>
                    <video
                       loop
                       ref={videoRef}
                       className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[320px] w-[50px] w-full aspect-video rounded cursor-pointer bg-black"
                       src={post.video.asset.url}
                    >
                     
                    </video>
                    <div className="mt-5 px-10 flex justify-between items-center">
     
<div className="text-xl cursor-pointer text-black"><AiOutlineHeart/></div> <div className="text-xl text-black cursor-pointer "><BsChatText/></div> <div className="text-xl text-black cursor-pointer"><BsSave2 /></div>
          </div>
                    
                    </div>
                </Link>
                {isHover && (
                    <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-40 lg:justify-between w-[100px] md:w-[50px] p-3">
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

export default VideoCard