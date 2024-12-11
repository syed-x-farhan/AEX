import React from "react";
import styles from "./Footer.module.css";
// Import Material-UI icons
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr className={styles.horizontalLine} />
      
      <div className={styles.footerContainer}>
        {/* AEX Exchange Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.heading}>AEX Exchange</h3>
          <p>Trade cryptocurrencies securely on the most user-friendly decentralized exchange.</p>
        </div>

        {/* Quick Links Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.heading}>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Swap</a></li>
            <li><a href="#">Team</a></li>
          </ul>
        </div>

        {/* Connect With Us Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.heading}>Connect With Us</h3>
          <div className={styles.socialIcons}>
            <a href="#"><LinkedInIcon style={{ color: '#0077b5' }} /></a>
            <a href="#"><InstagramIcon style={{ color: '#e4405f' }} /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <p>&copy; 2024 AEX Exchange. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
