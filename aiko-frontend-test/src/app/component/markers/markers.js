import { format } from 'date-fns';
import parado from '/public/icons/parado.png'
import manutencao from '/public/icons/manutencao.png'
import operando from '/public/icons/operando.png'
import { Icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import { selectEquipmentStateHistory } from '../../../../store/selectors/selectEquipmentStateHistory';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setFilteredHistory } from '../../../../store/slices/equipmentStateHistorySlice';
import { useEquipmentsContext } from '@/app/context/equipmentsContext';
import { selectEquipmentsProductiveHours } from '../../../../store/selectors/selectEquipmentsProductiveHours';


export default function Markers({ equipmentsLatestData }) {

    const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
    const dispatch = useDispatch();
    const state = useSelector((state) => state)
    const { setGainProductivity } = useEquipmentsContext();

    useEffect(() => {
        if (selectedEquipmentId) {
            const equipmentHistory = selectEquipmentStateHistory(selectedEquipmentId)(state);
            if (equipmentHistory) {
                dispatch(setFilteredHistory(equipmentHistory));
            }
        }
    }, [selectedEquipmentId, dispatch]);

    const handleEquipmentInfos = (id) => {
        setSelectedEquipmentId(id);
        setGainProductivity(selectEquipmentsProductiveHours(id)(state))
    };

    return (
        <>
            {equipmentsLatestData.map((latestData) => {

                if (latestData.lat) {
                    return (
                        <Marker position={[latestData.lat, latestData.lon]} key={latestData.equipmentId + latestData.date} icon={new Icon({
                            iconUrl: latestData.stateName == "Operando" ? operando.src : latestData.stateName == "Parado" ? parado.src : manutencao.src,
                            iconSize: [38, 38]
                        })}
                            eventHandlers={{
                                click: () => handleEquipmentInfos(latestData.equipmentId),
                            }}
                        >
                            <Popup>
                                Id:{latestData.equipmentId} <br /> Data: {format(new Date(latestData.date), "dd/MM/yyyy HH:mm")}<br /> Estado: {latestData.stateName}
                            </Popup>
                        </Marker>
                    )
                }
                return null
            })
            }
        </>
    )
}