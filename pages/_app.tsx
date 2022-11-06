import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


import '../styles/globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google'; 

import MiniNavbar from '../components/MiniNavbar';
import Story from '../components/Story';


const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
     setIsSSR(false);
  }, []);

if(isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <div className="xl:w-[1100px] md:w-[1000px] w-[100%] m-auto overflow-hidden h-[100vh]">
      <Navbar />

      <div>
      <MiniNavbar />
      </div>
      
      <div className="flex gap-3 md:gap-10">
      
            
            <div className="mt-4 mr-0 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            
          <div>
            <Story />
          </div>

            <Component  {...pageProps}/>
            </div>
             
                
            <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
                 <Sidebar />
            </div>
        
  

         </div>
         
      </div>
      
  </GoogleOAuthProvider>
  );
}

export default MyApp
