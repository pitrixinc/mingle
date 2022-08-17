import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import SuggestedAccounts from '../components/SuggestedAccounts';
import Footer from '../components/Footer';
import MiniDiscover from '../components/MiniDiscover';


const MiniCategory = () => {
  const [showSidebar, setShowSidebar] = useState(true);

const userProfile = false;

const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

  return (
    <div className="lg:hidden md:hidden block w-full w-[100%] absolute bg-white">
        <div
        className="hidden  m-2 ml-4 mt-3 text-xl"
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
                      <span className="text-xl lg:hidden md:hidden block">
                        For You
                      </span>
                  </div>
                 </Link>
              </div>
                  <MiniDiscover />
                  <SuggestedAccounts /> 
                  <Footer/>
          </div>
        )}
    </div>
  )
}

export default MiniCategory