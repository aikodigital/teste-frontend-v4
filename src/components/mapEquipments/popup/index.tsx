import React from "react";
import { IListEquipments } from "../../../types/equipment";
import styles from './PopupMarker.module.scss';
import ModalEquipment from "../../modal";
import { useEquipmentContext } from "../../../context/equipment";

interface Props{
    equipment: IListEquipments,
}

function PopupMarker({equipment}: Props){
    const {selectedEquipment, setSelectEquipment, activeModal, setActiveModal} = useEquipmentContext();

    function generateModal(){
        setActiveModal(true);
        setSelectEquipment(equipment);
    }

    return(
        <>
            <article className={styles.popupMarker}>
                <p className={styles.popupMarker___name_equipment}><b>Equipamento: </b>{equipment.name}</p>
                <p className={styles.popupMarker___model}><b>Modelo: </b> {equipment.model}</p>
                <p className={styles.popupMarker___state} style={{backgroundColor: equipment.stateColor}}><b>{equipment.stateCurrent}</b></p>
                <p className={styles.popupMarker___readMore} onClick={()=>generateModal()}>+Detalhes</p>
            </article>
        </>
    )
}

export default PopupMarker