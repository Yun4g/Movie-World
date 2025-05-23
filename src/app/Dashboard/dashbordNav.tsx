'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useMovieStore from '../store/movieDataStore';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const DashBoardNavbar = () => {
  const [toggle, setToggle] = useState(false);
  const [userData, setUserData] = useState('');
  const [loading, setLoading] = useState(true);
  console.log(userData);
  
  const logout = useMovieStore((state) => state.logout);
  const router = useRouter();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = async () => {
    try {
    
      await axios.post('/api/logout');
      logout();
      router.push('/login');
      alert('Logout successfully');
    } catch (error) {
      console.error('Logout error:', error);
      logout();
      router.push('/login');
    }
  };

  // useEffect(() => {
  //   // const fetchUserData = async () => {
      

  //     try {
  //       const res = await axios.get('/api/usersData');
        
  //       if (res.data && res.data.username) {
  //         setUserData(res.data.username);
  //       } else {
  //         console.warn("Username not found in response");
  //         setUserData('Unknown User');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
        
       
      
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUserData();

 
  // }, [router]);

  return (
    <nav className="bg-gray-900 text-white shadow-md py-2 px-4 flex justify-between items-center relative">
 
      <Link href="/" className="flex flex-col justify-center items-center gap-1">
        <h1 className="text-2xl md:text-3xl text-red-500 font-bold font-mono">
          MovieWorld
        </h1>
      </Link>


      <div className="hidden md:flex items-center gap-4">
        <Image
          src="/default-profile.png"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full border-2 border-gray-600"
        />
        <span className="text-xl font-bold">
          {loading ? 'Loading...' : userData || 'Guest'}
        </span>
        <button onClick={handleLogout} className="text-red-700 font-bold">
          Logout
        </button>
      </div>

   
      <div className="md:hidden">
        <button onClick={handleToggle} className="flex flex-col justify-center items-center w-8 h-8">
          <span
            className={`block w-6 h-1 bg-red-600 rounded-sm transition-transform duration-300 ${
              toggle ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-1 bg-red-600 rounded-sm my-1 transition-opacity duration-300 ${
              toggle ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-1 bg-red-600 rounded-sm transition-transform duration-300 ${
              toggle ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      
      {toggle && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center gap-4 py-4 rounded-b-lg z-50 md:hidden">
          <Image
            src="/default-profile.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-400"
          />
          <span className="text-lg text-cyan-100 font-semibold">
            {loading ? 'Loading...' : userData || 'Guest'}
          </span>
          <button onClick={handleLogout} className="text-red-700 cursor-pointer font-bold">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default DashBoardNavbar;