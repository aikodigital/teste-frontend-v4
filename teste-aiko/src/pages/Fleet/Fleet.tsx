import styles from "./Fleet.module.scss";
import Footer from "../../components/Footer/Footer";
import Search from "../../components/Search/Search";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Equipment } from "../../interfaces/Equipment";

export default function Fleet() {
  
  const navigate = useNavigate();
  
  const fleet = useSelector((state: RootState) => {
    const regexp = new RegExp(state.search, 'i');
    return state.fleet.filter((equipment: Equipment) => equipment.id.match(regexp));
  });


    return (
      <div className={styles.container}>
        <header>
          <h2>Fleet: </h2>
          <Search/>
        </header>

        <div className={styles.fleet}>
          {fleet?.map((equipment: Equipment) => (
            <div onClick={() => navigate(`/equipmentDetails/${equipment.id}`)} className={styles.item} key={uuidv4()}>
              <img src="src/assets/box-truck.png" alt="Truck" className={styles.image} />
              <div className={styles.info}>
                <p>Id:</p>
                <p>{equipment?.id}</p>
              </div>

              <div className={styles.info}>
                <p>Last location:</p>
                <p>{equipment?.id}</p>
              </div>
                
            </div>
          ))}
        </div>

        <Footer/>
      </div>
    )
  }