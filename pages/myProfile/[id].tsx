import { useState, useEffect } from "react";
import Image from 'next/image';
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL, createOrGetUser } from "../../utils";
import ProfileVideo from "../../components/ProfileVideo";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import useAuthStore from "../../store/authStore";
import { GoogleLogin } from "@react-oauth/google";

interface IProps {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[],
    }
}

const Profile = ({data}: IProps) => {
  const { userProfile, addUser, removeUser } = useAuthStore();
    const [showUserVideos,setShowUserVideos] = useState(true);
    const [videosList, setVideosList] = useState<Video[]>([]);
      const { user, userVideos, userLikedVideos } = data;

     const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'
     const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400'

     useEffect(() => {
       if(showUserVideos) {
          setVideosList(userVideos);
       } else {
        setVideosList(userLikedVideos);
       }
     }, [showUserVideos, userLikedVideos, userVideos]);
     
     const totalLikes = userVideos.reduce((sum, video) => sum + (video.likes?.length || 0), 0);

    
    return (
        
        <div className="h-full h-[100%] absolute top-[60px] bg-white mt-0 lg:w-[85%]  w-[100%]">
            <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
            <div className="w-16 h-16 md:w-32 md:h-32">
                    <Image
                       src={userProfile.image}
                       width={120}
                       height={120}
                       className="rounded-full"
                       alt="user profile"
                       layout="responsive"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="md:text-2xl tracking-wider items-center justify-center flex gap-1 items-center text-md font-bold text-primary">
                      {userProfile.userName}
                      <GoVerified className="text-pink-400"/>
                    </p>
                    <p className=" text-gray-400 text-xs md:text-xl lowercase">
                     @{userProfile.userName.replaceAll(' ','_')}
                    </p>
                    
                    <div className="flex justify-between text-gray-400 text-xs md:text-xl lowercase">
  <p className="mr-2">Total Videos:</p>
  <div className="flex items-center">
    <p className="mr-1 font-bold">{userVideos.length}</p>
    <p className="text-gray-600">Videos</p>
  </div>
</div>
<div className="flex justify-between text-gray-400 text-xs md:text-xl lowercase">
  <p className="mr-2">Total Likes:</p>
  <div className="flex items-center">
    <p className="mr-1 font-bold">{totalLikes}</p>
    <p className="text-gray-600">Likes</p>
  </div>
</div>

                    
        
                  </div>
                    
                    <div>
                     
                 
               </div>
             

       </div>

           
       
      


            <div>
                <div className="flex gap-5 mb-10 mb-10 border-b-2 border-gray-200 bg-white ">
                   <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={() => setShowUserVideos(true)}>Videos</p>
                   <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => setShowUserVideos(false)}>Liked</p>
                </div>
                <div className=" flex gap-2 flex-wrap md:justify-start grid lg:grid-cols-4 md:grid-cols-3 grid-cols-3  gap-x-2 gap-y-3 grid-flow-row-dense">
                    {videosList.length > 0 ? (
                       videosList.map((post: Video, idx: number) => (
                        <ProfileVideo post={post} key={idx} />
                       ) ) 
                    ) : <NoResults text={`No ${showUserVideos ? '' : 'Liked' } Videos Yet`} />}
                </div>
            </div>

        </div>
        
    )
}

export const getServerSideProps = async ({ 
    params: { id }
}: {
  params: {id: string}
}) => {
   const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

   return {
    props: { data: res.data }
   }
}

export default Profile;