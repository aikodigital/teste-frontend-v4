import { Aside } from '../components/aside/Aside';
import Map from '../components/Map/Map';
import { Navbar } from '../components/Navbar/Navbar';
import styles from '../pages/home.module.css';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Aside />
        <div className="containerMap">
          <Map />
        </div>
      </div>
    </>
  );
};

export default Home;
