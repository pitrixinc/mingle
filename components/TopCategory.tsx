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


const TopCategory = () => {
   const { fetchAllUsers, allUsers } = useAuthStore();

   useEffect(() => {
      fetchAllUsers();
   }, [fetchAllUsers]);



  return (
    
       
  <div className="md:hidden xl:hidden block  p-2 flex mr-0">
        <div className="flex overflow-x-auto space-x-1 snap-x">
        
          <MiniDiscover />
          
        </div>
   </div>   
   


  )
}

export default TopCategory;