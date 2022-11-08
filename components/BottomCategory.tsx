import React, {useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import { IUser } from '../types';
import Discover from './Discover';
import MiniDiscover from './MiniDiscover';


interface IProps {
  fetchAllUsers: () => void;
  allUsers: IUser[];
}


const BottomCategory = () => {
   const { fetchAllUsers, allUsers } = useAuthStore();

   useEffect(() => {
      fetchAllUsers();
   }, [fetchAllUsers]);



  return (
    
    <section
  className="block relative bottom-0 inset-x-0 z-50 shadow-sm text-gray-800 bg-white dark:bg-dark backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 dark:text-gray-400 border-t-2 border-royal/20 mb-0">

       
  <div className="md:hidden xl:hidden block  p-2 flex mr-0">
        <div className="flex overflow-x-auto space-x-1 snap-x">
        
          <MiniDiscover />
          
        </div>
   </div>   
   
</section>

  )
}

export default BottomCategory;