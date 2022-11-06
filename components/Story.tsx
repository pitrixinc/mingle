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


const Story = () => {
   const { fetchAllUsers, allUsers } = useAuthStore();

   useEffect(() => {
      fetchAllUsers();
   }, [fetchAllUsers]);

   const users = allUsers
   .sort(() => 0.5 - Math.random())
   .slice(0, allUsers.length);

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4 flex mr-0">
       
        
        <div className="flex overflow-x-auto space-x-1 snap-x">
          {allUsers.slice(0, 20).map((user: IUser) => (
            <Link href={`/profile/${user._id}`} key={user._id}>
              <div className="gap-1 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
                  <div className="w-29 h-29 md:w-40 md:h-40">
                    <Image
                       src={user.image}
                       width={35}
                       height={35}
                       className="rounded-full md:rounded-[10px] sm:w-30 sm:h-30"
                       alt="user profile"
                       layout="responsive"
                    />
                  </div>
                  
                    
                  <div>
                    <p className="flex gap-1 items-center text-md font-semibold lowercase text-primary">
                      {user.userName.replace(' ','_').substr(0, 7)}
                      <GoVerified className="text-pink-400"/>
                    </p>
                   
                  </div>
              </div>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default Story