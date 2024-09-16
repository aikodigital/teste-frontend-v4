import classNames from 'classnames';
import styles from './MainPage.module.scss';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function MainPage() {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <header>
                <nav>
                    <div>
                    <Link to='/map'>
                        Map
                    </Link>
                    </div>
                    <div>
                    <Link to='/trucks'>
                        Trucks
                    </Link>
                    </div>
                </nav>
            </header>
            <div className={styles['container-outlet']}>
                <Outlet />
            </div>
            
        </div>
    )
}