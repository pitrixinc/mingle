import React from 'react';
import Image from 'next/image';
import Logo from '../utils/mingle.png';

import useAuthStore from '../store/authStore';

const SplashScreen = () => {
    const { userProfile, addUser, removeUser } = useAuthStore();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
     <div className="w-[100px] md:w-[130px]">
              <Image 
                className="cursor-pointer"
                src={Logo}
                alt="Mingle"
                layout="responsive"
              />
           </div>
           
           
           
     <div className="flex justify-center items-center top-100 mt-20">
            <div className="grid gap-2">
                <div className="flex items-center justify-center space-x-2 animate-pulse">
                    <div className="w-4 h-4 bg-red-200 rounded-full"></div>
                    <div className="w-4 h-4 bg-red-300 rounded-full"></div>
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
            </div>

        </div>
      
      {userProfile ? ( 
            <div className="px-2 md:px-4 text-md font-semibold items-center mt-10">
                       <span className="">❤️ Welcome back {userProfile.userName} ❤️</span>
                   </div>
                   ): (
                   <div className="px-2 md:px-4 text-sm font-bold items-center mt-10">
                       <span className="">❤️ Project made by Kennedy Addo Quaye ❤️</span>
                   </div>
                   
                   )
      }
      
    </div>
  );
};

export default SplashScreen;
