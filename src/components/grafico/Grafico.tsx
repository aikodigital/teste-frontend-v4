import React from 'react';
import styles from './grafico.module.css';

interface DonutProps {
  percentage: number;
  color: string;
  secondaryColor?: string;
  children: number;
}

const DonutChart: React.FC<DonutProps> = ({
  percentage,
  color,
  secondaryColor,
  children,
}) => {
  const background = secondaryColor
    ? `conic-gradient(${color} ${percentage}%, ${secondaryColor} ${percentage}% 100%)`
    : `conic-gradient(${color} 0% ${percentage}%, ${color} ${percentage}% 100%)`;

  return (
    <div className={styles.donutChart} style={{ background }}>
      <div className={styles.centerHole}>
        <h5 className={styles.percentage}>{children}%</h5>
      </div>
    </div>
  );
};

export default DonutChart;
