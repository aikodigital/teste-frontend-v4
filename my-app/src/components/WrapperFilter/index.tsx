import React from 'react';
import styles from './WrapperFilter.module.css';


interface DisplayGridProps {
  columns: number;
  children: React.ReactNode;
}

const WrapperFilter: React.FC<DisplayGridProps> = ({ columns, children }) => {
  const gridTemplateColumns = `repeat(${columns}, calc((100% / ${columns}) - (2rem / ${columns})))`;

  return (
    <div
      className={styles.displayGrid}
      style={{ gridTemplateColumns }}
    >
      {children}
    </div>
  );
};

export default WrapperFilter;