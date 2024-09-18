import styles from "./EquipmentDetails.module.scss";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { DetailedEquipmentInterface } from "../../interfaces/DetailedEquipment";
import Footer from "../../components/Footer/Footer";
import detailedEquipment from "../../store/reducers/detailedEquipment";
import { StateHistoryInterface } from "../../interfaces/StateHistory";
import { v4 as uuidv4 } from 'uuid';

type MyParams = {
  id: string
}

export default function EquipmentDetails() {

    const { id } = useParams<MyParams>();

    const selectedEquipment = useSelector((state: RootState) => {
      const detailedEquipment = state.detailedEquipment.find((equipment: DetailedEquipmentInterface) => equipment.equipmentId === id);
        return detailedEquipment;
      });
    

    return (
      <div className={styles.container}>
        <div className={styles['card-container']}>

          <div className={styles['card']}>
            <div className={styles['img-container']}>
              <img src={selectedEquipment.imgUrl} alt="Vehicle" />
            </div>
            <div className={styles['info-container']}>
              <p>Position: {selectedEquipment.latestPosition}</p>
              <p>State: {selectedEquipment.currentState}</p>
              <div>
                <p>State history:</p>
                {selectedEquipment.stateHistory.map((state: StateHistoryInterface) => (
                  <div key={uuidv4()}>
                    <p >{state.date}</p>
                    <p >{state.equipmentStateId}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }