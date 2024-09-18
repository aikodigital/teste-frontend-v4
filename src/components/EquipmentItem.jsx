import PropTypes from "prop-types";
import styles from "./EquipmentItem.module.css";
import { Link } from "react-router-dom";
import { useEquipments } from "../contexts/EquipmentsContext";

function EquipmentItem({ equipment }) {
  const { name, id, model, lastHistory, lastStates } = equipment;
  const { currentEquipment } = useEquipments();

  return (
    <li>
      <Link
        className={`${styles.equipmentItem} ${
          currentEquipment.id === id ? styles["equipmentItem--active"] : ""
        }`}
        to={`${id}?lat=${lastHistory.lat}&lng=${lastHistory.lon}`}
      >
        <h3 className={styles.name}>{name}</h3>
        <h3 className={styles.name}>{model.name}</h3>
        <h3 className={styles.name} style={{ color: lastStates.color }}>
          {lastStates.name}
        </h3>
      </Link>
    </li>
  );
}

EquipmentItem.propTypes = {
  equipment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    model: PropTypes.object,
    lastHistory: PropTypes.object,
    lastStates: PropTypes.object,
  }).isRequired,
};

export default EquipmentItem;
