import React from 'react'
import './stateschart.css'
import Box from '@mui/material/Box';
import { 
    LineChart
} from '@mui/x-charts';

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
    hoursOfProductivity: number
}

interface StatesChartProps {
    selectedEquipment: LastsEquipmentDatas;
}

const StatesChart: React.FC<StatesChartProps> = ({ selectedEquipment }) => {
    return (
        <Box
            sx={{
                width: '100%',
                cursor: 'pointer'
            }}
        >
            <h2>Earning by time</h2>
            <LineChart 
                series={[
                    {
                        data: selectedEquipment.totalEarnings
                    }
                ]}
                yAxis={[
                    {
                        label: 'Earnings',
                    }
                ]}
            />
        </Box>
    )
}

export default StatesChart