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
import {FiDownload} from 'react-icons/fi';
import {ImCancelCircle} from 'react-icons/im';

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
    const [post1, setPost1] = useState(post);
    const videoRef = useRef<HTMLVideoElement>(null);


    


    
    const { userProfile }: any = useAuthStore();
    const handleLike = async (like: boolean) => {
          if(userProfile) {
            const { data } = await axios.put(`${BASE_URL}/api/like`, {
              userId: userProfile._id,
              postId: post._id,
              like
            })

           setPost1({ ...post1, likes: data.likes });
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

// read more & read less functionality
////////////////////////////////////
     const [isExpanded, setIsExpanded] = useState(false);
  
  // Count the number of words in the caption
  const captionWords = post.caption.split(' ');
  const captionWordCount = captionWords.length;

  // Check if the number of words in the caption is greater than 15
  const shouldShowReadMore = captionWordCount > 15;

  // Slice the caption to display only the first 15 words
  const captionPreview = captionWords.slice(0, 15).join(' ');

  // Handle the "Read More" click event
  const handleReadMoreClick = () => {
    setIsExpanded(true);
  };

  // Handle the "Read Less" click event
  const handleReadLessClick = () => {
    setIsExpanded(false);
  };
  

   // for the downloading functionality
   ///////////////////////////////////
   const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);
   const [xhr, setXhr] = useState<XMLHttpRequest | null>(null);

  const handleDownloadClick = () => {
    setIsDownloading(true);
    const downloadUrl = post.video.asset.url;
    const newXHR = new XMLHttpRequest();
    newXHR.open("GET", downloadUrl);
    newXHR.responseType = "blob";

    newXHR.addEventListener("progress", (event) => {
      const { loaded, total } = event;
      const progress = Math.round((loaded / total) * 100);
      setDownloadProgress(progress);
    });

    newXHR.addEventListener("load", () => {
      const blob = new Blob([newXHR.response]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "video.mp4";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
      setDownloadProgress(0);
      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
      }, 3000);
    });

    newXHR.addEventListener("error", () => {
      setIsDownloading(false);
      setDownloadProgress(0);
      setShowErrorMsg(true);
      setTimeout(() => {
        setShowErrorMsg(false);
      }, 3000);
    });

    setXhr(newXHR);
    newXHR.send();
  };

  const handleCancelClick = () => {
    if (xhr) {
      xhr.abort();
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };



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
                {/* Display the first 15 words of the caption */}
      <p className="px-1 ml-0 mb-2 mt-2 mr-0 md:text-md text-md text-primary text-justify justify-center">
        {isExpanded ? post.caption : `${captionPreview} ... `}
        {/* Display the "Read More" link if necessary */}
        {shouldShowReadMore &&
          <button 
             className="text-blue-500 hover:underline ml-2"
             onClick={handleReadMoreClick}>
            {isExpanded ? '' : 'Read More'}
          </button>
        }
      </p>
      
      {/* Display the "Read Less" link if necessary */}
      {isExpanded && shouldShowReadMore &&
        <button 
          className="text-blue-500 hover:underline ml-2"
          onClick={handleReadLessClick}>
          Read Less
        </button>
      }
                <Link href={`/detail/${post._id}`}>
                
                  <div>
                      
                    <video
                       loop
                       ref={videoRef}
                       className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[320px] w-[100%] w-full aspect-video md:rounded xl:rounded cursor-pointer bg-black mr-0"
                       src={post.video.asset.url}
                    >
                     
                    </video>
                    </div>
                </Link>
                    <div className="mt-2 px-3 flex justify-between items-center">
     
                    <div className=" pb-1">
                    <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold  rounded">
                    <p className="flex flex-row"> 
           {userProfile && (
            <LikeButton
            likes={post1.likes}
             handleLike={() => handleLike(true)}
             handleDislike={() => handleLike(false)}
            />
           )}
           </p>
           </div>
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
              
              <div className="pb-1">
      <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold text-black rounded">
        {!isDownloading && (
          <button className="text-2xl" onClick={handleDownloadClick}>
            <FiDownload />
          </button>
        )}
        {isDownloading && (
        <>
          <progress max="100" value={downloadProgress} className="relative w-full h-3 bg-gray-200 rounded-full">
           <span className="text-xs font-semibold inline-block text-white-600">
          {downloadProgress}% completed
          </span>
          </progress>
           <button className="text-2xl ml-2" onClick={handleCancelClick}>
              <ImCancelCircle />
            </button>
          </>
        )}
      </div>
      
    </div>
          {showSuccessMsg && (
        <p className="text-green-500">Download completed!</p>
      )}
      {showErrorMsg && (
        <p className="text-red-500">Couldn't download, try again!</p>
      )}    
          </div>
                    
                    
                {isHover && (
                    <div className="absolute bottom-20 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-40 lg:justify-between w-[90%] md:w-[90%] p-3">
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