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
  const logout = useMovieStore((state) => state.logout);
  console.log(userData);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
    alert('logout succesfully')
  }



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('/api/usersData');
        console.log(res.data.username);
        setUserData(res.data.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);



  return (
    <nav className="bg-gray-900 text-white shadow-md py-2 px-2 md:px-4 flex justify-between items-center relative">
      {/* Logo */}
      <Link href="/" className="flex flex-col justify-center gap-3 items-center space-x-2">
        <h1 className="text-2xl md:text-3xl text-red-500 font-bold font-mono">
          MovieWorld
        </h1>
      </Link>

     
      <div className="hidden md:flex items-center gap-3">
        <Image
          src="/default-profile.png"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full border-2 border-gray-600"
        />
        <span className="text-xl font-bold">{userData}</span>
        <button className="text-red-700 font-bold">Logout</button>
      </div>

  
      <div className="md:hidden">
        <button
          onClick={handleToggle}
          className="flex flex-col justify-center  w-8 h-8"
        >
          <span
            className={`block w-6 h-1 bg-red-600 rounded-sm transition-transform duration-300 ${
              toggle ? 'rotate-45 translate-y-2 ' : ''
            }`}
          ></span>
          <span
            className={`block w-3 h-1 bg-red-600 rounded-sm my-1 transition-opacity duration-300 ${
              toggle ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block w-2 h-1 bg-red-600 rounded-sm transition-transform duration-300 ${
              toggle ? '-rotate-45 -translate-y-2 w-6' : ''
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {toggle && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center gap-4 py-4 rounded-b-lg md:hidden">
          <Image
            src="/default-profile.png"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full border-2 border-gray-400"
          />
          <span className="text-xl font-bold text-gray-300">Delight Vincent</span>
          <button onClick={handleLogout} className="text-red-700 cursor-pointer font-bold">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default DashBoardNavbar;