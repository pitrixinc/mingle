import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';

import Logo from '../utils/tiktik-logo.png';
import { createOrGetUser } from '../utils';

import useAuthStore from '../store/authStore';

const Navbar = () => {
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
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
        <Link href="/">
           <div className="w-[100px] md:w-[130px]">
              <Image 
                className="cursor-pointer"
                src={Logo}
                alt="TikTik"
                layout="responsive"
              />
           </div>
        </Link>

        <div className="relative hidden md:block">
          <form
            onSubmit={handleSearch}
            className="absolute md:static top-10 -left-20 bg-white"
          >
            <input 
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search Accounts and Videos"
              className="bg-white p-3 md:text-md font-medium border-2 border-gray-140 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
            />
            <button
              onClick={handleSearch}
              className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
            >
              <BiSearch/>
            </button>
          </form>
        </div>

        <div>
          {userProfile ? (
            <div className="flex gap-5 md:gap-10">
                <Link href="/upload">
                   <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                       <IoMdAdd className="text-xl" /> {` `}
                       <span className="hidden md:block">Upload</span>
                   </button>
                </Link>

                <div class="flex justify-center">
  <div>
    <div className="dropdown relative">
      <button
        className="dropdown-toggle inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap"
        type="button"
        id="dropdownMenuButton2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
                {userProfile.image && (
                  <Link href="/">
                  <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="profile photo"
                  />
                  </>
                </Link>
                )}

<svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="caret-down"
          className="w-2 ml-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          ></path>
        </svg>
      </button>
      <ul
        className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none bg-gray-800"
        aria-labelledby="dropdownMenuButton2"
      >
        <h6
          className="text-gray-400 font-semibold text-sm py-2 px-4 block w-full whitespace-nowrap bg-transparent"
        >
          Dropdown header
        </h6>
        <span
          className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300"
          >Dropdown item text</span
        >
        <li>
          <a
            className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700 active:bg-blue-600"
            href="#"
            >Action</a
          >
        </li>
        <li>
          <a
            className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
            href="#"
            >Another action</a
          >
        </li>
        <li>
          <a
            className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
            href="#"
            >Something else here</a
          >
        </li>
        <li><hr className="h-0 my-2 border border-solid border-t-0 border-gray-300 opacity-25" /></li>
        <li>
          <a
            className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:text-white focus:bg-gray-700"
            href="#"
            >Separated link</a
          >
        </li>
      </ul>
    </div>
  </div>
</div>



                <button
                  type="button"
                  className="px-2"
                  onClick={() => {
                    googleLogout();
                    removeUser();
                  }}
                  >
                   <AiOutlineLogout color="red" fontSize={21} /> 
                </button>
            </div>
          ) : (
            <GoogleLogin
               onSuccess={(response) => createOrGetUser(response, addUser)}
               onError={() => console.log('Error')}
            />
          )}
        </div>
    </div>
  )
}

export default Navbar