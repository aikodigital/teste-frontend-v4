import styles from './MainPage.module.scss';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export default function MainPage() {

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <Navbar />
            </div>
            <div className={styles['container-outlet']}>
                <Outlet />
            </div>
        </div>
    )
}