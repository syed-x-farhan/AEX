import React from 'react';
import styles from './home.module.css';
import heroImage from './hero.png';
// Import the CryptoPrices component
import CryptoPrices from '../components/CryptoPrices';
// Material-UI icons for the features section
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SecurityIcon from '@mui/icons-material/Security';
import UpdateIcon from '@mui/icons-material/Update';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FeatureCard from '../components/FeatureCard';
// Import the Team component
import Team from '../components/Team';
import ConnectWalletButton from '../components/ConnectWalletButton';

const Home = () => {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.leftSection}>
          <h1>
            Trade Crypto With <span className={styles.gradientText}>Confidence</span>
          </h1>
          <p>
            Low fees. Lightning-fast transactions. Trustless. A platform
            built for traders, by traders.
          </p>
          
          <button className={styles.connectWalletButton}> <ConnectWalletButton /></button>
        </div>
        <div className={styles.rightSection}>
          <img src={heroImage} alt="Hero" className={styles.heroImage} />
        </div>
      </div>

      {/* Integrate CryptoPrices Component */}
      <CryptoPrices />

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2>Why Choose AEX?</h2>
        <div className={styles.featuresContainer}>
          <FeatureCard
            icon={FlashOnIcon}
            title="Lightning Fast"
            description="Execute trades instantly with our optimized trading engine."
          />
          <FeatureCard
            icon={SecurityIcon}
            title="Secure & Trustless"
            description="Trade directly from your wallet with full control of your assets."
          />
          <FeatureCard
            icon={UpdateIcon}
            title="Real-Time Updates"
            description="Get live price updates powered by Chainlink oracles."
          />
          <FeatureCard
            icon={AnalyticsIcon}
            title="Advanced Trading"
            description="Access professional trading tools and analytics."
          />
        </div>
      </section>

      {/* Team Section */}
      <Team />
    </div>
  );
};

export default Home;
