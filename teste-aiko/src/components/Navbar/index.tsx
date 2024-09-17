import { Link, useNavigate } from "react-router-dom";
import styles from './Navbar.module.scss';

export default function Navbar() {
    const navigate = useNavigate();

    return (
            <nav className={styles.nav}>
                <img src="src/assets/aiko.png" className={styles.logo} onClick={() => navigate('/')} />
                <div className={styles.links}>

                    <div>
                        <Link to='/' className={styles.link}>
                            Map
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