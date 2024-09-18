import { LatLngExpression } from "leaflet";
import styles from "./Fleet.module.scss";
import Footer from "../../components/Footer";
import Search from "../../components/Search/Search";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

type markerType = {
  equipmentId: String,
  geocode: LatLngExpression,
}

export default function Fleet() {
  
  const navigate = useNavigate();
  const { trucks } = useSelector((state: RootState) => {
  const regexp = new RegExp(state.search, 'i');
    return {
      trucks: state.trucks.filter((truck: markerType) => truck.equipmentId.match(regexp)),
    }
  });


    return (
      <div className={styles.container}>
        <header>
          <h2>Fleet: </h2>
          <Search/>
        </header>
          {trucks?.map((truck: markerType) => (
            <div onClick={() => navigate(`/truck/${truck.equipmentId}`)} className={styles.item}>
              <img src="src/assets/box-truck.png" alt="truck" className={styles.image} key={uuidv4()} />
              <div className={styles.info}>
                <p>Id:</p>
                <p>{truck.equipmentId}</p>
              </div>

              <div className={styles.info}>
                <p>Last location:</p>
                <p>{truck.geocode.toString()}</p>
              </div>
              
            </div>
        ))
        }
        <Footer/>
      </div>
    )
  }