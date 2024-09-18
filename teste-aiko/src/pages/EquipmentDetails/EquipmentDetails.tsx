import styles from "./EquipmentDetails.module.scss";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Equipment } from "../../interfaces/Equipment";

type MyParams = {
  equipmentId: string
}

export default function EquipmentDetails() {

    const { equipmentId } = useParams<MyParams>();

    const { selectedEquipment } = useSelector((state: RootState) => {
        return {
          selectedEquipment: state.fleet.find((equipment: Equipment) => equipment.id === equipmentId),
        }
      });
    

    return (
      <div className={styles.container}>
          <div className={styles['card']}>
            <div className={styles['img-container']}>
              <img src={selectedEquipment.imgPath} alt="Vehicle" />
            </div>
            <div className={styles['info-container']}>
              <p>{`Position: ${selectedEquipment.id}`}</p>
              <p>{`State: operando`}</p>
              <div>
                <p>{`State history: `}</p>
              </div>
            </div>
          </div>
      </div>
    )
  }