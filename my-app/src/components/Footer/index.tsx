"use client";

import Image from 'next/image';
import styles from './Footer.module.css';
import Logo from '@/public/aiko.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image src={Logo} alt="" width={28} height={22} />
      <p>Aiko. Alguns direitos reservados</p>
    </footer>
  );
}