import React from "react";
import styles from "./about.module.css";
import FAQ from "./FAQ";

const AboutUs = () => {
  const missions = [
    {
    
      title: "Accessibility for Everyone",
      description:
        "Make cryptocurrency trading accessible and intuitive for all users, from beginners to experts.",
    },
    {
     
      title: "Seamless Trading",
      description:
        "Deliver a seamless and intuitive trading experience by solving issues like scalability and high costs.",
    },
    {
      
      title: "Transparency & Security",
      description:
        "Ensure every transaction is secure and transparent by integrating Chainlink oracles and advanced technology.",
    },
  ];

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Who We Are Section */}
        <h2 className={styles.sectionTitle}>Who We Are</h2>
        <p className={styles.aboutText}>
          Welcome to AEX – your gateway to the future of decentralized finance
          (DeFi). At AEX, we believe in empowering individuals by providing a
          secure, efficient, and user-friendly platform to trade digital assets.
          Built on the highly scalable Polygon blockchain, AEX is more than just
          a decentralized exchange (DEX); it’s a revolutionary step toward a
          decentralized and transparent financial ecosystem.
        </p>

        {/* Our Mission Section */}
        <h2 className={`${styles.sectionTitle} ${styles.missionTitle}`}>Our Mission</h2>
        <div className={styles.mission}>
          {missions.map((mission, index) => (
            <div className={styles.missionCard} key={index}>
              <div className={styles.icon}>{mission.icon}</div>
              <h3>{mission.title}</h3>
              <p>{mission.description}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <FAQ />
      </div>
    </section>
  );
};

export default AboutUs;
