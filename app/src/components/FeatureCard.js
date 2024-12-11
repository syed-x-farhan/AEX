import React from 'react';
import styles from './featureCard.module.css';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className={styles.featureCard}>
      <div className={styles.iconContainer}>
        <Icon fontSize="large" />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard; 