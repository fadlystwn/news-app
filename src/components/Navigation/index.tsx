'use client'
import { useState, useEffect } from 'react';
import { getSession, logout } from '@/lib/auth';
import Link from 'next/link';
import styles from './navigation.module.css';

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
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">MySite</Link>
      </div>
      <button className={styles.menuToggle} onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
        {!isLoggedIn && (<li><Link href="/register">Register</Link></li>)}
        {isLoggedIn ? (
          <>
            <li><Link href="/profile">Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><Link href="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
