import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span>AEX</span>
      </div>

      <nav className={`${styles.nav} ${isNavActive ? styles.active : ''}`}>
        <ul className={styles.navLinks}>
          <li><Link to="/swap">Swap</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li className={styles.connectWalletMobile}>
            <Link to="/connect-wallet" className={styles.connectWallet}>Connect Wallet</Link>
          </li>
        </ul>
      </nav>

      <Link to="/connect-wallet" className={`${styles.connectWallet} ${styles.connectWalletDesktop}`}>
        Connect Wallet
      </Link>

      <button className={`${styles.hamburger} ${isNavActive ? styles.active : ''}`} onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
};

export default Header;
