import { FC } from 'react';
import { Equipment } from '../types/equipment';
import { EquipmentState } from '../types/equipmentState';

interface EquipmentPopupProps {
    equipment: Equipment;
    state: EquipmentState;
}

const EquipmentPopup: FC<EquipmentPopupProps> = ({ equipment, state }) => {
    return (
        <div className="p-2">
            <h3 className="text-lg font-semibold">{equipment.name}</h3>
            <p>
                Estado atual: <span style={{ color: state.color }}>{state.name}</span>
            </p>
        </div>
    );
};

export default EquipmentPopup;
