import { LatLngExpression } from "leaflet";
import styles from "./Truck.module.scss";
import { useParams } from 'react-router-dom';

type markerType = {
  equipmentId: String,
  geocode: LatLngExpression,
}

export default function Truck() {

    const { id } = useParams();

    return (
      <div className={styles.container}>
        {id}
      </div>
    )
  }