import IEquipment from '../../interfaces/IEquipment';
import IEquipmentModel from '../../interfaces/IEquipmentModel';
import IEquipmentPosition from '../../interfaces/IEquipmentPosition';
import IEquipmentState from '../../interfaces/IEquipmentState';
import IEquipmentStateHistory from '../../interfaces/IEquipmentStateHistory';
import Map from '../Map'
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import './AppWrapper.scss'
import { DataTab } from '../DataTab';

interface EquipmentComponentProps {
    equipmentList: IEquipment[];
    equipmentModelList: IEquipmentModel[];
    equipmentPositionList: IEquipmentPosition[];
    equipmentStateList: IEquipmentState[];
    equipmentStateHistoryList: IEquipmentStateHistory[];
}

const render = (status: Status) => (<h1>{status}</h1>);

export const AppWrapper: React.FC<EquipmentComponentProps> = ( {equipmentList, equipmentModelList, equipmentPositionList, equipmentStateList, equipmentStateHistoryList} ) => {

    return (
        <div className='app-wrapper'>
            <Wrapper apiKey={"AIzaSyAfLVhiScppGdM72PP662XUfSXIbDQfUHs"} render={render}>
                <Map equipmentList = {equipmentList} equipmentModelList = {equipmentModelList} equipmentPositionList = {equipmentPositionList} equipmentStateList = {equipmentStateList} equipmentStateHistoryList = {equipmentStateHistoryList}/>
            </Wrapper>
        </div>
    )
}


