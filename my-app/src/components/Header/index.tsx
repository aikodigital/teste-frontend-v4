import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css'; 
import Logo from '@/public/aiko.png';

export default async function Header() {
    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`}>
                <Link className={styles.logo} href="/" aria-label="Ir para página inicial">
                    <Image
                        src={Logo}
                        alt=""
                        width={28}
                        height={22}
                        priority
                    />
                </Link>
            </nav>
        </header>
    );
};
