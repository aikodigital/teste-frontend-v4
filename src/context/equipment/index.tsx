import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";
import { IEquipament, IEquipamentPositionHistory, IEquipmentState, IEquipmentModel, IEquipmentStateHistory, IListEquipments } from "../../types/equipment";
import equipmentData from '../../assets/data/equipment.json';
import equipmentModelData from '../../assets/data/equipmentModel.json';
import equipmentPositionHistoryData from '../../assets/data/equipmentPositionHistory.json';
import equipmentStateData from '../../assets/data/equipmentState.json';
import equipmentStateHistoryData from '../../assets/data/equipmentStateHistory.json';

interface EquipmentsContextData {
    equipments: IEquipament[];
    equipmentsModel: IEquipmentModel[];
    equipmentsPositionHistory: IEquipamentPositionHistory[];
    equipmentsState: IEquipmentState[];
    equipmentsStateHistory: IEquipmentStateHistory[];
    listEquipments: IListEquipments[];
    filteredEquipments: IListEquipments[];
    setFilteredEquipments: React.Dispatch<React.SetStateAction<IListEquipments[] | []>>;
    position: [number, number];
    selectedEquipment: IListEquipments | undefined;
    setSelectEquipment: React.Dispatch<React.SetStateAction<IListEquipments | undefined>>;
    activeModal: Boolean;
    setActiveModal: React.Dispatch<React.SetStateAction<Boolean>>;
}

const EquipmentsContext = createContext<EquipmentsContextData | undefined>(undefined);

interface EquipmentsProviderProps {
    children: ReactNode;
}

interface IPositionHistory {
    date: string;
    state: string;
    color: string;
    lat: number;
    lon: number;
}

interface IHourlyEarnings{
    state: string;
    value: number;
}

export function EquipmentsProvider({ children }: EquipmentsProviderProps){
    const [equipments, setEquipments] = useState<IEquipament[]>([]);
    const [equipmentsModel, setEquipmentsModel] = useState<IEquipmentModel[]>([]);
    const [equipmentsPositionHistory, setEquipmentsPositionHistory] = useState<IEquipamentPositionHistory[]>([]);
    const [equipmentsState, setEquipmentsState] = useState<IEquipmentState[]>([]);
    const [equipmentsStateHistory, setEquipmentsStateHistory] = useState<IEquipmentStateHistory[]>([]);
    const [listEquipments, setListEquipments] = useState<IListEquipments[]>([]);
    const [filteredEquipments, setFilteredEquipments] = useState<IListEquipments[]>([]);
    const positionDefault: [number, number] = [-15.793889, -47.882778];
    const [position, setPosition] = useState(positionDefault);
    const [selectedEquipment, setSelectEquipment] = useState<IListEquipments | undefined>();
    const [activeModal, setActiveModal] = useState<Boolean>(false);

    //Daniel: obtem dados de equipamentos ao carregar a página
    useEffect(() =>{
        setEquipments(equipmentData);
        setEquipmentsModel(equipmentModelData);
        setEquipmentsPositionHistory(equipmentPositionHistoryData);
        setEquipmentsState(equipmentStateData);
        setEquipmentsStateHistory(equipmentStateHistoryData);
    },[])
    
    //Daniel: hook para o resgate de todos os dados de equipamentos da pasta 'data' e montagem da lista
    useEffect(()=>{
        generateListEquipments();
    },[equipments, equipmentsModel, equipmentsPositionHistory, equipmentsState, equipmentsStateHistory]);

    //Daniel: atualiza o marcador default
    useEffect(()=>{
        if (listEquipments.length > 0 && listEquipments[0]?.positionCurrent) {
            setPosition([listEquipments[0].positionCurrent.lat, listEquipments[0].positionCurrent.lon] as [number, number]);
        }
    },[listEquipments]);

    function generateListEquipments(){
        const list = equipments?.map(equipment => {

            //Daniel: verificar o modelo do equipamento
            const modelData = equipmentsModel?.find(model => model.id === equipment.equipmentModelId);

            //Daniel: mapeia o estado e valor correspondente
            const hourlyEarnings = modelData?.hourlyEarnings.map(model =>{
                const stateData = equipmentsState.find(equipmentState => equipmentState.id === model.equipmentStateId)

                return{
                    state: stateData?.name || 'Parado',
                    value: model.value || 0
                }
            }) || [];

            // //Daniel: verifica as posições do equipamento
            const positions = equipmentsPositionHistory.find(position => position.equipmentId === equipment.id);     

            //Daniel: verificar o histórico do estado do equipamento
            const stateHistoryData = equipmentsStateHistory.find(stateHistory => stateHistory.equipmentId === equipment.id);

            //Daniel: mapeia o histórico de estados do equipamento
            const positionHistory = stateHistoryData?.states.map(state =>{
                // Daniel: encontra a posição correspondente à data do estado
                const correspondingPosition = positions?.positions.find(pos => pos.date === state.date);

                // Daniel: verifica a ultima posição com localização disponivel
                const lastKnownPosition = correspondingPosition || positions?.positions.reduce((lastPos, currentPos) => {
                    const currentDate = new Date(currentPos.date);
                    const stateDate = new Date(state.date);

                    return currentDate <= stateDate ? currentPos : lastPos;
                }, positions.positions[0]);
                
                //Daniel: obtém os dados do estado correspondente
                const stateData = equipmentsState.find(equipmentState => equipmentState.id === state.equipmentStateId);

                return{
                    date: state.date,
                    state: stateData?.name || 'Parado',
                    color: stateData?.color || '#f1c40f',
                    lat: lastKnownPosition?.lat || 0,
                    lon: lastKnownPosition?.lon || 0
                }
            }) || [];  

            //Daniel: obtem a localização mais recente
            const location = getMostRecentLocation(positions?.positions);

            //Daniel: obtem o estado atual do equipamento
            const stateCurrent = positionHistory.find(state => state.date === location?.date);

            //Daniel: obtém o calculo de produtividade
            const {productivity} = calculateProductivity(positionHistory);

            return {
                id: equipment.id,
                name: equipment.name,
                model: modelData?.name || 'Desconhecido',
                lastStateDate: formatDate(String(location?.date)),
                stateCurrent: stateCurrent?.state === undefined ? 'Parado' : stateCurrent?.state,
                stateColor: stateCurrent?.color === undefined ? '#f1c40f' : stateCurrent?.color,
                productivity: productivity,
                positionHistory: positionHistory.map(state=>({
                    ...state,
                    date: formatDate(state.date)
                })),
                positionCurrent: {
                    lat: location?.lat || 0,
                    lon: location?.lon || 0
                }
            }
 
        });

        setListEquipments(list);   
        setFilteredEquipments(list);     
    }


    function getMostRecentLocation(states: {date: string; lat: number; lon: number}[] | undefined){
        if(!states || states.length === 0) return null;

        const mostRecentState = states.reduce((latest, current) => {
            const currentDate = new Date(current.date);
            const latestDate = new Date(latest.date);

            return currentDate > latestDate ? current : latest;
        })

        return mostRecentState;
    };

    //Daniel: formata o valor de data 
    function formatDate(dateString: string){
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2,'0');
        const month = String(date.getMonth()).padStart(2,'0')
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2,'0');
        const minutes = String(date.getMinutes()).padStart(2,'0');

        return `${day}/${month}/${year} ${hours}:${minutes}`
    }

    //Daniel: Cálculo de ganho por equipamento
    function calculateGain(equipment: IListEquipments, hourlyEarnings: IHourlyEarnings[]){
        let totalGain = 0;

        equipment.positionHistory.forEach((pos, i) =>{
            if(i === 0) return;

            const previousState = equipment.positionHistory[i - 1].state;
            const previousDate = equipment.positionHistory[i - 1].date;
            const currentDate = pos.date;

            const timeDifference = calculateDifferenceTime(previousDate, currentDate);

            const dataRate = hourlyEarnings.find(hour => {
                return hour.state === pos.state
            });
            
            const rate = dataRate?.value || 0;

            totalGain += timeDifference * rate; 
        });

        console.log('totalGain ', totalGain);

        return{
            totalGain: totalGain.toFixed(2)
        }
    }
    
    //Daniel: obtém o calculo de produtividade
    function calculateProductivity(positionsEquipments: IPositionHistory[]){
        let totalTime = 0;
        let totalTimeProd = 0;

        positionsEquipments.forEach((pos, i) =>{
            if(i === 0) return

            const previousState = positionsEquipments[i - 1].state;
            const previousDate = positionsEquipments[i - 1].date;
            const currentDate = pos.date;

            const timeDifference = calculateDifferenceTime(previousDate, currentDate);
            totalTime += timeDifference;

            if(previousState === "Operando"){
                totalTimeProd += timeDifference;
            }

        });
        
        const productivity = (totalTimeProd / totalTime) * 100;

        return {
                    productivity: productivity.toFixed(2) + "%",
                    totalTime,
                };

    }

    //Daniel: calcular a diferença de tempo em milissegundos
    function calculateDifferenceTime(initialDate: string, finalDate: string){
        const dt1 = new Date(initialDate);
        const dt2 = new Date(finalDate);
        const difInMs = Math.abs(dt2.getTime() - dt1.getTime());;
        return difInMs / (1000 * 60 * 60);
    }

    return(
        <EquipmentsContext.Provider value={{
            equipments,
            equipmentsModel,
            equipmentsPositionHistory,
            equipmentsState,
            equipmentsStateHistory,
            listEquipments,
            filteredEquipments, 
            setFilteredEquipments,
            position,
            selectedEquipment,
            setSelectEquipment,
            activeModal,
            setActiveModal
        }}>
            {children}
        </EquipmentsContext.Provider>
    )
}

export const useEquipmentContext = () => {
    const context = useContext(EquipmentsContext);
    if(context === undefined){
        throw new Error('useEquipmentContext deve ser usado dentro de um EquipmentsProvider')
    }
    return context
}