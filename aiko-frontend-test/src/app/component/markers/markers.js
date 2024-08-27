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


export default function Markers({ equipmentsLatestData }) {

    const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
    const dispatch = useDispatch();
    const equipmentStateHistory = useSelector((state) => state.equipmentStateHistory.data)
    const equipmentState = useSelector((state) => state.equipmentState.data);

    useEffect(() => {
        if (selectedEquipmentId) {
            const equipmentHistory = selectEquipmentStateHistory(selectedEquipmentId)({
                equipmentStateHistory: { data: equipmentStateHistory },
                equipmentState: { data: equipmentState }
            });

            dispatch(setFilteredHistory(equipmentHistory))
        }

    }, [selectedEquipmentId, equipmentStateHistory, equipmentState, dispatch])


    const handleEquipmentHistory = (id) => {
        setSelectedEquipmentId(id);
    };

    return (
        <>
            {equipmentsLatestData.map((latestData) => (


                <Marker position={[latestData.lat, latestData.lon]} key={latestData.equipmentId} icon={new Icon({
                    iconUrl: latestData.stateName == "Operando" ? operando.src : latestData.stateName == "Parado" ? parado.src : manutencao.src,
                    iconSize: [38, 38]
                })}
                    eventHandlers={{
                        click: () => handleEquipmentHistory(latestData.equipmentId),
                    }}
                >
                    <Popup>
                        Id:{latestData.equipmentId} <br /> Data: {format(new Date(latestData.date), "dd/MM/yyyy HH:mm")}<br /> Estado: {latestData.stateName}
                    </Popup>
                </Marker>

            )

            )
            }
        </>
    )
}