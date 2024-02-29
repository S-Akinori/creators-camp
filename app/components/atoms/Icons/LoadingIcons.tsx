import React from 'react';
import styles from './LoadingIcon.module.css';


const LoadingIcon: React.FC = () => {
  return (
    <div className={styles.loadingIcon}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingIcon;