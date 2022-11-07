import React, {useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import { IUser } from '../types';


interface IProps {
  fetchAllUsers: () => void;
  allUsers: IUser[];
}


const BottomCategory = () => {
   const { fetchAllUsers, allUsers } = useAuthStore();

   useEffect(() => {
      fetchAllUsers();
   }, [fetchAllUsers]);

   const users = allUsers
   .sort(() => 0.5 - Math.random())
   .slice(0, allUsers.length);

  return (
    <section
  className="block fixed bottom-0 inset-x-0 z-50 shadow-lg text-gray-800 bg-gray-700 dark:bg-dark backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 dark:text-gray-400 border-t-2 border-royal/20">
  <div id="tabs" className="flex justify-between"></div>
       
        
        <div className="flex overflow-x-auto space-x-1 snap-x">
          {allUsers.slice(0, 20).map((user: IUser) => (
            <Link href={`/profile/${user._id}`} key={user._id}>
              <div className="gap-1 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
                  <div className="w-29 h-29 md:w-40 md:h-40">
                    <Image
                       src={user.image}
                       width={35}
                       height={35}
                       className="rounded-full md:rounded-[10px] sm:w-35 sm:h-35"
                       alt="user profile"
                       layout="responsive"
                    />
                  </div>
                  
                    
                  
              </div>
            </Link>
          ))}
        </div>
        
</section>
  )
}

export default BottomCategory;