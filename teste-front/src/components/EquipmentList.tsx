import React from 'react';
import '../styles/equipmentList.scss';

interface EquipmentListProps {
  equipment: any[];
  selectedEquipment: string | null; // Recebe o equipamento selecionado
  onSelectEquipment: (id: string | null) => void; // Permite 'null' para desmarcar
}

const EquipmentList: React.FC<EquipmentListProps> = ({ equipment, selectedEquipment, onSelectEquipment }) => {

  const handleSelect = (id: string) => {
    if (selectedEquipment === id) {
      onSelectEquipment(null); // Passa 'null' para desmarcar
    } else {
      onSelectEquipment(id); // Passa o ID do equipamento selecionado
    }
  };

  return (
    <div className="equipment-list">
      <h3>Lista de Equipamentos</h3>
      <ul>
        {equipment.map((equip) => (
          <li
            key={equip.id}
            onClick={() => handleSelect(equip.id)}
            className={selectedEquipment === equip.id ? 'selected' : ''}
          >
            {equip.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentList;
