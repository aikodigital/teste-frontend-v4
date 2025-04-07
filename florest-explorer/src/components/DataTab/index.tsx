import IEquipment from '../../interfaces/IEquipment';
import IEquipmentModel from '../../interfaces/IEquipmentModel';
import IEquipmentPosition from '../../interfaces/IEquipmentPosition';
import IEquipmentState from '../../interfaces/IEquipmentState';
import IEquipmentStateHistory from '../../interfaces/IEquipmentStateHistory';
import { DataItem } from '../DataItem';
import './DataTab.scss'

interface EquipmentComponentProps {
    equipmentItem: IEquipment;
    equipmentStateList: IEquipmentState[];
    equipmentStateHistoryList: IEquipmentStateHistory[];
}

interface HistoryItem {
    date: string;
    status: string;
}

interface EquipmentHistoryInfo {
    equipmentName: string;
    equipmentHistory: HistoryItem[]
}

export const DataTab: React.FC<EquipmentComponentProps> = ( {equipmentItem, equipmentStateList, equipmentStateHistoryList} ) => {

    let dateStatusList : EquipmentHistoryInfo = {
        equipmentName : equipmentItem.name,
        equipmentHistory : []
    }

    let rawHistory = equipmentStateHistoryList.find((item) => item.equipmentId === equipmentItem.id)

    if(rawHistory){
        rawHistory.states.forEach(dateStatus => {
            let itemStatus = equipmentStateList.find((item) => item.id === dateStatus.equipmentStateId)?.name
            if(itemStatus) {
                dateStatusList.equipmentHistory.push({
                    date : dateStatus.date,
                    status : itemStatus
                })
            }
        });
    }

    return (
        <div className='data-wrapper'>
            <span className='data-wrapper__title'>{dateStatusList.equipmentName}</span>
            <ul>
                {dateStatusList.equipmentHistory.map( dateStatus => <li key={dateStatus.date}><DataItem date = {dateStatus.date} status = {dateStatus.status} /></li>)}
            </ul>
        </div>
    )
}