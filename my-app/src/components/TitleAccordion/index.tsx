import React, { ReactNode } from 'react';
import styles from './TitleAccordion.module.css';

interface Props {
  title: string;
  icon?: ReactNode;
  noBorderBottom?: boolean;
  fontSize?: string;
  marginTop?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  marginLeft?: string;
}

const Title: React.FC<Props> = ({
  title,
  icon,
  width,
  height,
  backgroundColor,
}) => {

  return (
    <div className={styles.container}>
      {icon && (
        <div
          className={styles.wrapperIcon}
          style={{
            backgroundColor: backgroundColor || 'var(--blueDark)',
            width: width || '3.8rem',
            height: height || '3.8rem',
          }}
        >
          {icon}
        </div>
      )}
      <h1 className={styles.label} style={{fontSize: '1.6rem' }}>
        {title}
      </h1>
    </div>
  );
};

export default Title;