import React from 'react';
import styles from './Layout.module.scss';
import Nav from '../Nav/Nav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Nav />
      <div className={styles.layout_content}>{children}</div>
    </div>
  );
};

export default Layout;
