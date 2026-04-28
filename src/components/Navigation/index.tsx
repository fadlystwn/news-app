'use client'
import { useState, useEffect } from 'react';
import { getSession, logout } from '@/lib/auth';
import Link from 'next/link';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsOpen(prevState => !prevState);

  const handleLogout = async () => {
    try {
      await logout();

    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const loginCheck = async () => {
      const session = await getSession()
      const isLogin = session?.sessionData?.userId

      if (isLogin) {
        setIsLoggedIn(true)
      }
    }
    loginCheck()
  }, []);

  return (
    <nav className="h-[60px] flex justify-between items-center px-5 border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 relative">
      <div className="text-2xl font-bold font-serif">
        <Link href="/">MySite</Link>
      </div>
      <button
        className="md:hidden bg-transparent border-none text-2xl cursor-pointer text-gray-800 dark:text-white"
        onClick={toggleMenu}
      >
        ☰
      </button>
      <ul className={`list-none m-0 p-0 md:flex md:items-center md:static md:flex-row md:bg-transparent md:border-none md:w-auto md:p-0
        ${isOpen
          ? 'flex flex-col absolute top-[60px] left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50'
          : 'hidden md:flex'
        }`}>
        <li className="md:ml-5 border-b border-gray-200 dark:border-gray-700 md:border-none px-5 py-3 md:p-0"><Link href="/" className="font-sans hover:underline">Home</Link></li>
        <li className="md:ml-5 border-b border-gray-200 dark:border-gray-700 md:border-none px-5 py-3 md:p-0"><Link href="/about" className="font-sans hover:underline">About</Link></li>
        {!isLoggedIn && (
          <li className="md:ml-5 border-b border-gray-200 dark:border-gray-700 md:border-none px-5 py-3 md:p-0"><Link href="/register" className="font-sans hover:underline">Register</Link></li>
        )}
        {isLoggedIn ? (
          <>
            <li className="md:ml-5 border-b border-gray-200 dark:border-gray-700 md:border-none px-5 py-3 md:p-0"><Link href="/profile" className="font-sans hover:underline">Profile</Link></li>
            <li className="md:ml-5 border-b border-gray-200 dark:border-gray-700 md:border-none px-5 py-3 md:p-0">
              <button
                onClick={handleLogout}
                className="bg-transparent border-none p-0 text-base font-sans cursor-pointer text-inherit hover:underline"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className="md:ml-5 border-b border-gray-200 dark:border-gray-700 md:border-none px-5 py-3 md:p-0"><Link href="/login" className="font-sans hover:underline">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
