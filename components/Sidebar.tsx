import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import SuggestedAccounts from './SuggestedAccounts';
import Footer from './Footer';
import { HiOutlineChat } from 'react-icons/hi';
import { BiVideoPlus } from 'react-icons/bi';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

const userProfile = false;

const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

  return (
    <div className="hidden md:block">
        <div
        className="block xl:hidden  m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
       >
          {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
        </div>
        {showSidebar && (
          <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
              <div className="xl:border-b-2 border-gray-200 pb-4">
                 <Link href="/">
                  <div className={normalLink}>
                    <p className="text-2xl">
                      <AiFillHome />
                      </p>
                      <span className="text-xl hidden xl:block">
                        For You
                      </span>
                  </div>
                 </Link>
              </div>


              <div className="xl:border-b-2 border-gray-200 pb-4">
                 <Link href="/">
                  <div className="flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-black rounded">
                    <p className="text-2xl">
                      <HiOutlineChat />
                      </p>
                      <span className="text-xl hidden xl:block">
                        Private Chats / Channels 
                      </span>
                  </div>
                 </Link>
              </div>


              <div className="xl:border-b-2 border-gray-200 pb-4">
                 <Link href="https://mymingle.netlify.app">
                  <div className="flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-black rounded">
                    <p className="text-2xl">
                      <BiVideoPlus />
                      </p>
                      <span className="text-xl hidden xl:block">
                        Video Meeting
                      </span>
                  </div>
                 </Link>
              </div>


                  <Discover /> 
                  <SuggestedAccounts /> 
                  <Footer/>
          </div>
        )}
    </div>
  )
}

export default Sidebar