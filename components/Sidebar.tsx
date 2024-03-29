import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
import useAuthStore from '../store/authStore';
import { BiVideoPlus } from 'react-icons/bi';
import { HiOutlineChat } from 'react-icons/hi';
import { SiYourtraveldottv } from 'react-icons/si';
import { FiSettings } from 'react-icons/fi';
const Sidebar: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);
  const { pathname } = useRouter();
  const { fetchAllUsers, allUsers }: any = useAuthStore();

  const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';

  return (
    <div>
      <div
        className='md:block hidden md:ml-1 ml-0 mt-3 text-xl'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='xl:block md:block hidden xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
            <Link href='/'>
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='capitalize text-md hidden xl:block'>
                  For You
                </span>
              </div>
            </Link>
          </div>



          <div className="xl:border-b-2 border-gray-200 pb-1">
                 <Link href="/">
                  <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold text-black rounded">
                    <p className="text-2xl">
                      <HiOutlineChat />
                      </p>
                      <span className="text-md hidden xl:block">
                        Messenger
                      </span>
                  </div>
                 </Link>
              </div>


              <div className="xl:border-b-2 border-gray-200 pb-1">
                 <Link href="https://mymingle.netlify.app">
                  <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold text-black rounded">
                    <p className="text-2xl">
                      <BiVideoPlus />
                      </p>
                      <span className="text-md hidden xl:block">
                        Video Meeting
                      </span>
                  </div>
                 </Link>
              </div>


              <div className="xl:border-b-2 border-gray-200 pb-1">
                 <Link href="https://mymingle.netlify.app">
                  <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold text-black rounded">
                    <p className="text-2xl">
                      <SiYourtraveldottv />
                      </p>
                      <span className="text-md hidden xl:block">
                        Travel Advisor
                      </span>
                  </div>
                 </Link>
              </div>

              <div className="xl:border-b-2 border-gray-200 pb-1">
                 <Link href="https://mymingle.netlify.app">
                  <div className="flex items-center gap-1 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-bold text-black rounded">
                    <p className="text-2xl">
                      <FiSettings />
                      </p>
                      <span className="text-md hidden xl:block">
                        Setting
                      </span>
                  </div>
                 </Link>
              </div>

          <div  className="">
          <Discover />
          </div>

          <div  className="">
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
          </div>

          
          <Footer />
          

        </div>
      )}
    </div>
  );
};

export default Sidebar;
