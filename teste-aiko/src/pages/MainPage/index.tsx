import styles from './MainPage.module.scss';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/index';

export default function MainPage() {

    const location = useLocation();
    const navigate = useNavigate();

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