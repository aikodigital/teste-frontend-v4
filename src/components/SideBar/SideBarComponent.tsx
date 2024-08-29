import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSelectedEquipmentId as selectEquipment } from '../../store/equipmentSlice';

//services
import { combineEquipmentData } from '../../services/MapService';

//styles
import styles from "./SideBarComponent.module.css";

//images
import up from '../../assets/img/up.png';
import down from '../../assets/img/down.png';

const SideBar: React.FC = () => {
  const dispatch = useDispatch();
  const equipmentData = combineEquipmentData();
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
  const selectedEquipmentId = useSelector((state: RootState) => state.equipment.selectedEquipmentId);
  const searchQuery = useSelector((state: RootState) => state.equipment.searchQuery);

  const toggleDropdown = (equipmentId: string) => {
    setOpenDropdowns(prevState => ({
      ...prevState,
      [equipmentId]: !prevState[equipmentId],
    }));
    dispatch(selectEquipment(equipmentId));
  };

  const filteredEquipmentData = equipmentData.filter((equipment) => {
    const lastState = equipment.states[equipment.states.length - 1];

    const equipmentNameMatch = !searchQuery || equipment.name.toLowerCase().includes(searchQuery);
    const modelNameMatch = !searchQuery || equipment.model.name.toLowerCase().includes(searchQuery);
    const stateNameMatch = !searchQuery || lastState.stateName.toLowerCase().includes(searchQuery);

    const matchesQuery = equipmentNameMatch || modelNameMatch || stateNameMatch;
    const matchesSelected = !selectedEquipmentId || equipment.equipmentId === selectedEquipmentId;

    return matchesQuery && matchesSelected;
  });

  return (
    <div className={`${styles.sideBarContainer} sidebar bg-light p-3 border-end`}>
      <div className="list-group">
        {filteredEquipmentData.map((equipment) => {
          const sortedStates = [...equipment.states].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

          const lastState = sortedStates[0];
          const isOpen = openDropdowns[equipment.equipmentId] || false;
          const isSelected = selectedEquipmentId === equipment.equipmentId; 

          return (
            <div 
              key={equipment.equipmentId} 
              className={`${styles.sideBarBox} shadow-sm ${isSelected ? styles.selected : ''}`} 
              onClick={() => toggleDropdown(equipment.equipmentId)} 
              aria-expanded={isOpen}
              aria-controls={`collapse-${equipment.equipmentId}`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className='w-100'>
                  <h2 className="h5">{equipment.name}</h2>
                  <p className="mb-1 text-muted">Modelo: {equipment.model.name}</p>
                  <p className="mb-1 text-muted">
                    Data: {new Date(lastState.date).toLocaleDateString()}
                  </p>
                  <p className="mb-1 text-muted">
                    Horário: {new Date(lastState.date).toLocaleTimeString()}
                  </p>
                  <div className='d-flex justify-content-between mt-3'>
                    <div className="d-flex align-items-center mb-1">
                      <span
                        className="rounded-circle me-2"
                        style={{
                          width: '16px',
                          height: '16px',
                          backgroundColor: lastState.color,
                        }}
                      ></span>
                      <span>{lastState.stateName}</span>
                    </div>
                    <img
                      src={isOpen ? up : down} 
                      alt={isOpen ? 'Esconder histórico' : 'Mostrar histórico'}
                      style={{ width: '16px', height: '16px' }}
                    />
                  </div>
                </div>
              </div>
              <div
                id={`collapse-${equipment.equipmentId}`}
                className={`collapse ${isOpen ? 'show' : ''}`}
              >
                <div className="mt-2">
                  <h4 className='h6'>Histórico de Status:</h4>
                  {sortedStates.map((state, index) => (
                    <div key={index} className={`${styles.sideBarMiniBox} d-flex align-items-center mb-1`}>
                      <span
                        className="rounded-circle me-2"
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: state.color,
                        }}
                      ></span>
                      <span>{state.stateName}</span>
                      <span className="text-muted ms-2">
                        ({new Date(state.date).toLocaleString()})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
