import { FC } from 'react';
import { EquipmentTableItem } from '../../types/equipment';

interface EquipmentRowProps {
    equipment: EquipmentTableItem;
    onSelect: (id: string) => void;
}

const EquipmentRow: FC<EquipmentRowProps> = ({ equipment, onSelect }) => (
    <tr 
        className="hover:bg-blue-50 transition-colors cursor-pointer"
        onClick={() => onSelect(equipment.id)}
    >
        <td className="px-3 py-2 whitespace-nowrap">
            <div className="font-medium text-gray-800 text-sm">{equipment.name}</div>
        </td>
        <td className="px-3 py-2 whitespace-nowrap">
            <div className="text-gray-500 text-sm">{equipment.type}</div>
        </td>
        <td className="px-3 py-2 whitespace-nowrap">
            <div className="flex items-center">
                <span 
                    className="h-2.5 w-2.5 rounded-full mr-2" 
                    style={{backgroundColor: equipment.stateColor }}
                    aria-hidden="true"
                />
                <span className="text-sm">{equipment.state}</span>
            </div>
        </td>
    </tr>
);

export default EquipmentRow;