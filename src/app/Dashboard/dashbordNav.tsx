'use client';

import { useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useMovieStore from '../store/movieDataStore';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const DashBoardNavbar = () => {
  const [toggle, setToggle] = useState(false);

  const [userData, setUserData] = useState<string | null>(null);
  console.log(userData)


  
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
    } catch (error) {
      console.error('Logout error:', error);
      logout();
      router.push('/login');
    }
  };

useEffect(() => {
  const name = localStorage.getItem('userName') || 'Guest';
  setUserData(name);
}, []);

  return (
    <nav className="bg-gray-900 text-white shadow-md py-2 px-4 flex justify-between items-center relative">
 
      <Link href="/" className="flex  justify-center items-center gap-2">
        <h1 className=" text-base text-red-500  font-bold font-mono">
          Welcome
          
          
          
        </h1>
        <span className='text-white text-lg  ms-2 font-semibold font-mono'>
            {
             userData ?  userData : 'Welcome'
           }
          </span>
      </Link>


      <div className="hidden md:flex items-center gap-4">
        <Image
          src="/default-profile.png"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full border-2 border-gray-600"
        />
      
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
       
          <button onClick={handleLogout} className="text-red-700 cursor-pointer font-bold">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default DashBoardNavbar;