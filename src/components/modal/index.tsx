import React from 'react';
import { useEquipmentContext } from '../../context/equipment'
import styles from './ModalEquipment.module.scss'


function ModalEquipment(){
    const {selectedEquipment, activeModal, setActiveModal} = useEquipmentContext();  

    return(
        <>
            {selectedEquipment && (
                <div className={styles.modal_popup}>
                    <article className={styles.modal_popup___modal}>
                        <h3 id={styles.close_modal} onClick={()=>setActiveModal(false)}>X</h3>
                        <div className={styles.title_equipment}>
                            <h5>{selectedEquipment.name}</h5>
                            <span>{selectedEquipment.model}</span>
                        </div>
                        <div className={styles.data_equipment}>
                            <p><b>Estado: </b> <span style={{color: selectedEquipment.stateColor}}>{selectedEquipment.stateCurrent}</span></p>
                            <p><b>Dt. Ultima Posição: </b> {selectedEquipment.lastStateDate}</p>
                            <p><b>Produtividade: </b> {selectedEquipment.productivity}</p>
                        </div>
                        <div className={styles.listStateHistory}>
                            <p><b>Histórico de Posições</b></p>
                        </div>
                        <div className={styles.listPositionsHistory}>
    
                            {selectedEquipment.positionHistory.map((equipment, index) =>{
                                return(
                                    <aside className={styles.listPositionsHistory___item} key={index}>
                                        <div>
                                            <p>{equipment.date}</p>
                                            <span style={{color: equipment.color}}>{equipment.state}</span>
                                        </div>
                                        <div>
                                            <div>
                                                <p><span><b>lat: </b>{equipment.lat}</span> / <span><b>lon: </b> {equipment.lon}</span></p> 
                                            </div>
                                        </div>
    
                                    </aside>
                                )
                            })}
                        </div>
                    </article>
                </div>
            )}
        </>
    )
}

export default ModalEquipment