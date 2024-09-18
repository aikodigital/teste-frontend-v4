import { Link, useNavigate } from "react-router-dom";
import styles from './Navbar.module.scss';
import logo from '../../assets/aiko.png';

export default function Navbar() {
    const navigate = useNavigate();

    return (
            <nav className={styles.nav}>
                <img src={logo} className={styles.logo} onClick={() => navigate('/')} />
                <div className={styles.links}>

                    <div>
                        <Link to='/' className={styles.link}>
                            Map
                        </Link>
                    </div>
                    <div>
                        <Link to='/fleet' className={styles.link}>
                            Fleet
                        </Link>
                    </div>
                </div>   
            </nav>
    )
}