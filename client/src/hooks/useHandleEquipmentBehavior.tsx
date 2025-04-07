import { useEffect, useState, useRef } from 'react'
import equipamentModel from '../data/equipmentModel.json'
import equipamentPositionHistory from '../data/equipmentPositionHistory.json'
import equipmentState from '../data/equipmentState.json'
import equipmentStateHistory from '../data/equipmentStateHistory.json'
import equipment from '../data/equipment.json'

type Equipment = {
    id: string
    equipmentModelId: string
    name: string
}

type LastsEquipmentDatas = {
    equipmentId: string
    name: string
    equipmentModelName: string
    positions: { date: string, lat: number, lon: number }[]
    statesIdByTime: { date: string, equipmentStateId: string, name: string, color: string }[]
    color: string
    lastUpdate: string,
    earningByTime: { date: string, earning: number }[],
    totalEarnings: number[],
    equipmentModelId: string,
    hoursOfProductivity?: number
}

const useHandleEquipmentBehavior = () => {

    const [equipments, setEquipments] = useState<LastsEquipmentDatas[]>([])
    const [date, setDate] = useState<Date>(new Date("2021-02-01T03:00:00.000Z"));
    const [totalHours, setTotalHours] = useState<number>(1);
    const [totalEarnings, setTotalEarnings] = useState<number>(0);
    const isInitialRender = useRef(true);

    const generateRandomColor = (): string => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            setDate((prevDate) => {
                const newDate = new Date(prevDate);
                newDate.setHours(newDate.getHours() + 1);
                return new Date(newDate.toISOString());
            });
            setTotalHours((prevHours) => prevHours + 1);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isInitialRender.current) {
            // Ignora o primeiro ciclo
            isInitialRender.current = false;
            return;
        }
     
        let hash: LastsEquipmentDatas[] = equipments || []
        let _totalEarnings = 0;

        let existUpdate = false

        equipment?.map(({ id, name, equipmentModelId }: Equipment) => {

            const _equipmentDataHistory = hash?.find((eq) => eq.equipmentId === id);
        
            // model
            const _equipmentModel = equipamentModel.find((eq) => eq.id === equipmentModelId);

            // location
            const _equipmentPositionByTime = equipamentPositionHistory.find((eq) => eq.equipmentId === id);
            const _equipmentLocationAtTime = _equipmentPositionByTime?.positions.find((pos) => pos.date === date.toISOString());

            const updatedPositions = _equipmentDataHistory?.positions
                ? [..._equipmentDataHistory.positions]
                : [];

            if (_equipmentLocationAtTime) {
                existUpdate = true
                updatedPositions.push(_equipmentLocationAtTime);
            }
            // states
            const _equipmentStateHistory = equipmentStateHistory.find((eq) => eq.equipmentId === id);
            const _equipmentStateAtDate = _equipmentStateHistory?.states.find((state) => state.date === date.toISOString());
        
            const updatedStatesIdByTime = _equipmentDataHistory?.statesIdByTime
                ? [..._equipmentDataHistory.statesIdByTime]
                : [];

            let newEarning = _equipmentDataHistory?.earningByTime || []
            let newHoursOfProductivity = _equipmentDataHistory?.hoursOfProductivity || 0

            if (_equipmentStateAtDate) {
                existUpdate = true
                const equipmentNewState = equipmentState.find((eq) => eq.id === _equipmentStateAtDate.equipmentStateId);

                const earningsByState = _equipmentModel?.hourlyEarnings?.find((e) => e.equipmentStateId === _equipmentStateAtDate.equipmentStateId);

                if(earningsByState) {
                    const earning = earningsByState.value;

                    if(earning > 0) newHoursOfProductivity += 1;

                    newEarning.push({
                        date: _equipmentStateAtDate.date,
                        earning: earning
                    });
                }

                updatedStatesIdByTime.push({
                    date: _equipmentStateAtDate.date,
                    equipmentStateId: _equipmentStateAtDate.equipmentStateId,
                    name: equipmentNewState?.name || '',
                    color: equipmentNewState?.color || ''
                });
            } else {
                const lastState = newEarning[newEarning.length - 1];
                newEarning.push({
                    date: date.toISOString(),
                    earning: lastState ? lastState.earning : 0
                })
            }

            // earnings
            const equipmentTotalEarnings = newEarning.reduce((acc, curr) => acc + curr.earning, 0);
            _totalEarnings += equipmentTotalEarnings;

            const newEarningsHistory = _equipmentDataHistory?.totalEarnings
                ? [..._equipmentDataHistory.totalEarnings, equipmentTotalEarnings]
                : [equipmentTotalEarnings];
            
            // updated
            let newUpdatedDate = existUpdate 
                ? date.toISOString() 
                : _equipmentDataHistory?.lastUpdate || date.toISOString();
        
            const newEquipmentData = {
                equipmentId: id,
                name: name || '',
                equipmentModelName: _equipmentModel?.name || '',
                positions: updatedPositions,
                statesIdByTime: updatedStatesIdByTime,
                color: _equipmentDataHistory?.color || generateRandomColor(),
                lastUpdate: newUpdatedDate,
                earningByTime: newEarning,
                totalEarnings: newEarningsHistory,
                equipmentModelId: _equipmentModel?.id || '',
                hoursOfProductivity: newHoursOfProductivity
            };
        
            if (_equipmentDataHistory) {
                const updatedEquipments = hash?.map((equipment) =>
                    equipment.equipmentId === id ? newEquipmentData : equipment
                );
                hash = [...updatedEquipments];
            } else {
                hash.push(newEquipmentData);
            }

            existUpdate = false
        });
        
        setEquipments(hash)
        setTotalEarnings(_totalEarnings)
    }, [date])

    return {
        equipments,
        totalHours,
        totalEarnings
    }
}

export default useHandleEquipmentBehavior