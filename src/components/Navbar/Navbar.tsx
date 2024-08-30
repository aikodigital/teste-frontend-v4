import styles from './navbar.module.css';
import logo from '../../assets/img/aiko.png';
import menu from '../../assets/icons/menu.png';
import { Input } from '../input/Input';

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="Logo" />
<Input/>
      <div className={styles.contentUser}>
        <h5 className={styles.nameUser}>UserName</h5>
        <button className={styles.menu}>
          <img src={menu} alt="Menu" />
        </button>
      </div>
    </div>
  );
};
