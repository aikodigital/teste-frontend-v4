import styles from './navbar.module.css';
import logo from '../../assets/img/aiko.png';
import menu from '../../assets/icons/menu.png';

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="Logo" />
      <input
        type="text"
        placeholder="Pesquise por equipamento, estado ou localização"
        className={styles.inputNav}
      />
      <div className={styles.contentUser}>
        <h5 className={styles.nameUser}>UserName</h5>
        <button className={styles.menu}>
          <img src={menu} />
        </button>
      </div>
    </div>
  );
};
