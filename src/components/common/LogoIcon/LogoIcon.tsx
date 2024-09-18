import React from 'react';
import styles from './LogoIcon.module.scss';

interface LogoIconProps {
  src: string;
  alt?: string;
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({
  src,
  alt = 'Logo',
  className,
}) => {
  return (
    <img src={src} alt={alt} className={`${styles.logoIcon} ${className}`} />
  );
};

export default LogoIcon;
