import React from 'react';
import styles from './History.module.scss'; // Import the module styles

const History: React.FC = () => {
  return (
    <div className={styles.historyPage}>
      <h2>Historico</h2>
      <div className={styles.historyContent}>
        {/* Add content for equipment history here */}
        <p>Here you can see the historical data for all the equipment.</p>
      </div>
    </div>
  );
};

export default History;
