import { useState, useEffect } from 'react';
import { logout } from '@/lib/auth';
import Link from 'next/link';
import styles from './navigation.module.css';

// Mock function to check if the user is logged in
const checkIfLoggedIn = () => {
  // Replace this with actual authentication check logic
  return Boolean(localStorage.getItem('isLoggedIn'));
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Update the logged-in state when the component mounts
    setIsLoggedIn(checkIfLoggedIn());
  }, []);

  const toggleMenu = () => setIsOpen(prevState => !prevState);

  const handleLogout = async () => {
    try {
      await logout(); // Make sure the logout function is awaited
      setIsLoggedIn(false); // Update the logged-in state
      // Optionally, redirect or show a message
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
        <li><Link href="/services">Services</Link></li>
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
