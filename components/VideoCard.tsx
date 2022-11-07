import React, { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill, BsChatText, BsSave2 } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import { Video } from '../types';
import { AiOutlineHeart } from 'react-icons/ai';
import { GoComment } from 'react-icons/go';
import { FiShare } from 'react-icons/fi';


import useAuthStore from '../store/authStore';
import LikeButton from './LikeButton';
import  axios from 'axios';
import { BASE_URL } from '../utils';


interface IProps {
    post: Video;
}
const VideoCard: NextPage<IProps> = ({ post}: IProps) => {
    const [isHover, setIsHover] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);



    
    const { userProfile }: any = useAuthStore();
    const handleLike = async (like: boolean) => {
      if(userProfile) {
        const { data } = await axios.put(`${BASE_URL}/api/like`, {
          userId: userProfile._id,
          postId: post._id,
          like
        })
      }
    }





   
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
                    <p className="flex gap-2 items-center md:text-md font-bold text-primary">{post.postedBy.userName}  {' '} <GoVerified className="text-pink-400 text-md"/></p>
                    <p className="font-medium text-xs text-gray-500 hidden md:block lowercase">@{post.postedBy.userName.replace(' ','_')}</p>
                </div>
              </Link>
              </div>
          </div>
       </div>
          <div className="lg:ml-20 mr-0 ml-0 flex gap-2 relative mt-0">
             <div 
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="rounded-3xl mr-0">
                <Link href={`/detail/${post._id}`}>
                
                  <div>
                  <p className="px-1 ml-0 mb-2 mt-2 mr-0 md:text-md text-md text-primary text-justify justify-center">{post.caption}</p>
                    <video
                       loop
                       ref={videoRef}
                       className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[320px] w-[100%] w-full aspect-video md:rounded xl:rounded cursor-pointer bg-black mr-0"
                       src={post.video.asset.url}
                    >
                     
                    </video>
                    <div className="mt-2 px-3 flex justify-between items-center">
     
                    <div className="mt-10 px-10">
           {userProfile && (
            <LikeButton
            likes={post.likes}
             handleLike={() => handleLike(true)}
             handleDislike={() => handleLike(false)}
            />
           )}
          </div>

              <div className=" pb-1">
                  <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold text-black rounded">
                    <p className="text-2xl">
                      <GoComment />
                      </p>
                      
                  </div>
                 
              </div> 
 
              <div className=" pb-1">
                  <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold text-black rounded">
                    <p className="text-2xl">
                      <FiShare />
                      </p>
                      
                  </div>
                 
              </div>
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