'use client';

import Link from "next/link";
import { CaretLeft } from "phosphor-react";
import styles from "./Navigation.module.css";

interface NavigationLinkProps {
  titlePage: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({ titlePage }) => {
  return (
    <nav className={styles.navigation}>
      <p>
        Página Inicial &gt; <strong>{titlePage}</strong>
      </p>
      <div>
        <Link href="/" tabIndex={-1}>
          <button className={styles.buttonChevron} tabIndex={0}>
            <CaretLeft className={styles.accordionChevron} />
          </button>
        </Link>
        <h1>{titlePage}</h1>
      </div>
    </nav>
  );
};