import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch, BiArrowBack } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/tiktik-logo.png';
import { createOrGetUser } from '../utils';

import useAuthStore from '../store/authStore';

const MiniSearch = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [searchValue, setSearchValue] = useState('');
  const router =useRouter();

  const handleSearch = (e: { preventDefault:() => void}) => {
    e.preventDefault(); 

    if(searchValue) {
      router.push(`/search/${searchValue}`);
    }

  }

  return (
    <div className="w-[100%] h-full absolute left-0 top-0 bg-white hidden sm:block">
        


        
        <div className="xl:border-b-2 border-gray-200 pb-1">
                 <Link href="/">
                  <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold text-black rounded">
                    <p className="text-2xl">
                      <BiArrowBack />
                      </p>
                      
                  </div>
                 </Link>
              </div>






        <div className="relative lg:hidden md:hidden block mb-5">
          <form
            onSubmit={handleSearch}
            className="absolute md:static bg-white"
          >
            <input 
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Accounts"
              className="bg-white p-3 md:text-md font-medium border-2 border-gray-140 focus:outline-none focus:border-2 focus:border-gray-300 ml-5  w-[250px]   rounded-full md:top-0"
            />
            <button
              onClick={handleSearch}
              className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
            >
              <BiSearch/>
            </button>
          </form>
        </div>

        </div>
    
  )
}

export default MiniSearch