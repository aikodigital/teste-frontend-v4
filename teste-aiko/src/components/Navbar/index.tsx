import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from './Navbar.module.scss';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
            <nav className={styles.nav}>
                <img className={styles.logo} onClick={() => navigate('/')} />
                <div className={styles.links}>

                    <div>
                        <Link to='/' className={styles.link}>
                            Home
                        </Link>
                    </div>
                    <div>
                        <Link to='/trucks' className={styles.link}>
                            Trucks
                        </Link>
                    </div>
                </div>   
            </nav>
    )
}