import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEquipmentsLatestData } from "../../../store/selectors/selectEquipmentsLatestData";
import { setEquipmentLatestHistory } from "../../../store/slices/equipmentPositionHistorySlice";
import { selectEquipmentsProductiveHours } from "../../../store/selectors/selectEquipmentsProductiveHours";



export const EquipmentsContext = createContext({});

export default function EquipmentsProvider({ children }) {

    const equipmentStateHistory = useSelector((state) => state.equipmentStateHistory.data)
    const equipmentState = useSelector((state) => state.equipmentState.data);
    const equipmentPositionHistory = useSelector((state) => state.equipmentPositionHistory.data)
    const equipment = useSelector((state) => state.equipment.data)
    const [equipmentsMapMarkers, setEquipmentsMapMarkers] = useState([])
    const dispatch = useDispatch();
    const [initialLoad, setInitialLoad] = useState(false)
    const state = useSelector((state) => state);
    const [gainProductivity, setGainProductivity] = useState(null)



    useEffect(() => {
        if (!initialLoad && equipmentStateHistory.length > 0 && equipmentState.length > 0 && equipmentPositionHistory.length > 0 && equipment.length > 0) {
            const equipmentsData = selectEquipmentsLatestData({
                equipmentStateHistory: { data: equipmentStateHistory },
                equipmentState: { data: equipmentState },
                equipmentPositionHistory: { data: equipmentPositionHistory },
                equipment: { data: equipment }
            });

            setEquipmentsMapMarkers(equipmentsData);
            dispatch(setEquipmentLatestHistory(equipmentsData));
            setInitialLoad(true);

        }
    }, [initialLoad, equipmentStateHistory, equipmentState, equipmentPositionHistory, equipment, dispatch]);




    return (
        <EquipmentsContext.Provider value={{ equipmentsMapMarkers, setEquipmentsMapMarkers, gainProductivity, setGainProductivity }}>
            {children}
        </EquipmentsContext.Provider>
    )
}

export const useEquipmentsContext = () => useContext(EquipmentsContext)