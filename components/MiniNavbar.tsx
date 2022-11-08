import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch, BiVideoPlus, BiCategory } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { SiYourtraveldottv } from 'react-icons/si';

import Logo from '../utils/mingle.png';
import { createOrGetUser } from '../utils';

import useAuthStore from '../store/authStore';

import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { GoHome } from 'react-icons/go';
import { RiMessengerLine } from 'react-icons/ri';
import Discover from './Discover';
import MiniSearch from './MiniSearch';

const MiniNavbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState('');
  const router =useRouter();

  



  const { pathname } = useRouter();
  const { fetchAllUsers, allUsers }: any = useAuthStore();

  const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';




  const handleSearch = (e: { preventDefault:() => void}) => {
    e.preventDefault(); 

    if(searchValue) {
      router.push(`/search/${searchValue}`);
    }

  }

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-1 px-1 xl:hidden md:hidden block shadow-sm mt-0">
        <div className="xl:border-b-2 border-gray-200 pb-1">
                 <Link href="/">
                  <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold text-black rounded">
                    <p className="text-2xl">
                      <GoHome />
                      </p>
                      
                  </div>
                 </Link>
              </div>

          <div className="xl:border-b-2 border-gray-200 pb-1">
                 <Link href="./MiniSearch">
                  <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold text-black rounded">
                    <p className="text-2xl">
                      <BiSearch />
                      </p>
                      
                  </div>
                 </Link>
              </div>

          
              <div className="xl:border-b-2 border-gray-200 pb-1">
                 <Link href="https://mymingle.netlify.app">
                  <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold  rounded">
                  <div className={pathname === '/' ? activeLink : normalLink}>
                    <p className="text-3xl">
                      <BiVideoPlus />
                      </p>
                  </div>
                  </div>
                 </Link>
              </div>


              <div className="xl:border-b-2 border-gray-200 pb-1">
                 <Link href="/">
                  <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold text-black rounded">
                    <p className="text-2xl">
                      <RiMessengerLine />
                      </p>
                      
                  </div>
                 </Link>
              </div>



              <div className="xl:border-b-2 border-gray-200 pb-1">
                 <Link href="https://mymingle.netlify.app">
                  <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold text-black rounded">
                    <p className="text-2xl">
                      <SiYourtraveldottv />
                      </p>
                      
                  </div>
                 </Link>
              </div>

    </div>
  )
}

export default MiniNavbar