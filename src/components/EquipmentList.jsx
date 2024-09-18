import PropTypes from "prop-types";
import Spinner from "./Spinner";
import styles from "./EquipmentList.module.css";
import EquipmentItem from "./EquipmentItem";
import Message from "./Message";
import { useEquipments } from "../contexts/EquipmentsContext";

function EquipmentList() {
  const { equipments, isLoading } = useEquipments();

  if (isLoading) return <Spinner />;

  if (!equipments.length)
    return (
      <Message message="Add your first equipment by clicking on a equipment on the map" />
    );

  return (
    <div className={styles.equipmentList}>
      {equipments.map((equipment) => (
        <EquipmentItem equipment={equipment} key={equipment.id} />
      ))}
    </div>
  );
}

EquipmentList.propTypes = {
  equipments: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default EquipmentList;
