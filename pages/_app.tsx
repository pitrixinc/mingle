import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


import '../styles/globals.css';
import { GoogleOAuthProvider } from '@react-oauth/google'; 

import MiniNavbar from '../components/MiniNavbar';
import Story from '../components/Story';
import BottomCategory from '../components/BottomCategory';
import TopCategory from '../components/TopCategory';
import SplashScreen from '../components/SplashScreen';


const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
     setIsSSR(false);
     
     // Simulate fetching data or performing other async tasks here
    // When done, set isReady to true to show the app
     setTimeout(() => {
      setIsReady(true);
    }, 3000);
  }, []);

if(isSSR) return null;



  

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
    {!isReady && <SplashScreen />}
      {isReady && (
      <div className="xl:w-[1100px] md:w-[1000px] sm:w-[1000px] md:m-auto xl:m-auto m-0 overflow-hidden h-[100vh]">
      <Navbar />

      <div className="fixed z-index-1 bottom-0 w-full">
            <MiniNavbar />
          </div>
      

     
      
      <div className="flex gap-0 md:gap-10">
      
            
            <div className="mt-0 mr-0 flex w-[100%] flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            
          <div>
            <Story />
            <TopCategory />
          </div>
          

            <Component  {...pageProps}/>
            </div>
             

          


            <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
                 <Sidebar />
            </div>

         </div>

         
      </div>
      
     )}
  </GoogleOAuthProvider>
  );
}

export default MyApp
