import React, {useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import { IUser } from '../types';
import Discover from './Discover';


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
          <Discover />
        </div>
        
</section>
  )
}

export default BottomCategory;