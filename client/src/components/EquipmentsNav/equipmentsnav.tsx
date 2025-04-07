import React, { useEffect, useState } from 'react'
import './equipmentsnav.css'
import useHandleEquipmentBehavior from '../../hooks/useHandleEquipmentBehavior';
import { ArrowLeft, Box, DollarSign, Percent, Tractor } from 'lucide-react';
import StatesChart from '../StatesChart/stateschart';

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

interface EquipmentsNavProps {
    handleVisibleEquipments: (id: string) => void;
    visibleEquipmentsIds: string[];
    toggleAllEquipments: () => void;
    equipments: LastsEquipmentDatas[];
    colors: string[]
    filter: { models: string[]; states: string[] } | null
};

const EquipmentsNav: React.FC<EquipmentsNavProps> = ({ equipments, colors, filter }) => {

    const { 
        totalHours,
        totalEarnings
    } = useHandleEquipmentBehavior()
    
    const [selectedEquipment, setSelectedEquipment] = useState<LastsEquipmentDatas>()
    const [openPositionsLog, setOpenPositionsLog]= useState<boolean>(false)
    const [openStatesLog, setOpenStatesLog]= useState<boolean>(false)

    const handleFilterDisplayEquipment = (modelId: string, stateId: string) => {
        return filter?.states.includes(stateId) && filter?.models.includes(modelId)
    }

    useEffect(() => {console.log('se', selectedEquipment)}, [selectedEquipment])

    return (
        <div id="equipments-nav">
            {
                !selectedEquipment &&
                <header>
                    <h1>Equipments</h1>
                    <p>Total earnings: <span style={{color: totalEarnings < 0 ? 'red' : ''}}>{`${totalEarnings}$`}</span></p>
                </header>
            }
            {
                !selectedEquipment &&
                <article id='equipments-list'>
                    {
                        equipments?.map((equipment, index) => (
                            <div
                                key={equipment.equipmentId}
                                className={`equipment ${!handleFilterDisplayEquipment(equipment.equipmentModelId, equipment.statesIdByTime[equipment.statesIdByTime?.length-1]?.equipmentStateId) ? 'hidden' : ''}`}
                                style={{ borderLeft: `5px solid ${colors[index]}` }}
                            >
                                <div className='equipment-name'>
                                    <p>
                                        <span 
                                            style={{backgroundColor: equipment?.statesIdByTime[equipment?.statesIdByTime?.length-1]?.color}}
                                            className='state-color'
                                        />
                                        <span>{`${equipment.name} - ${equipment?.equipmentModelName}`}</span>
                                        <button onClick={() => setSelectedEquipment({ ...equipment, equipmentModelId: '' })}>+</button>
                                    </p>
                                    <b>Equipment</b>
                                </div>
                                <div className='equipment-infos'>
                                    <section>
                                        <p>{equipment?.statesIdByTime[equipment?.statesIdByTime?.length-1]?.name}</p>
                                        <b>State</b>
                                    </section>
                                    <section>
                                        <p>{`${equipment?.totalEarnings[equipment?.totalEarnings?.length-1]}$`}</p>
                                        <b>Earnings</b>
                                    </section>
                                    <section>
                                        <p>{`${((equipment?.hoursOfProductivity/totalHours)*100)?.toFixed(2)}%`}</p>
                                        <b>Productivity</b>
                                    </section>
                                </div>
                            </div>
                        ))
                    }
                </article>
            }
            {
                selectedEquipment &&
                <article id='equipment-infos'>
                    <header>
                        <button onClick={() => setSelectedEquipment(undefined)}>
                            <ArrowLeft />
                        </button>
                        <h2>Equipment Datas</h2>
                    </header>
                    <div>
                        <section id='infos'>
                            <div className="info1">
                                <div 
                                    className="icon"
                                    style={{backgroundColor: `${selectedEquipment?.statesIdByTime[selectedEquipment?.statesIdByTime?.length-1]?.color}80`}}
                                >
                                    <Tractor />
                                </div>
                                <p>
                                    <span>{selectedEquipment?.name}</span>
                                    <b>Equipment</b>
                                </p>
                            </div>
                            <div className="info1">
                                <div 
                                    className="icon"
                                    style={{backgroundColor: `${selectedEquipment?.statesIdByTime[selectedEquipment?.statesIdByTime?.length-1]?.color}80`}}
                                >
                                    <Box />
                                </div>
                                <p>
                                    <span>{selectedEquipment?.equipmentModelName}</span>
                                    <b>Model</b>
                                </p>
                            </div>
                            <div className="info1">
                                <div 
                                    className="icon"
                                    style={{backgroundColor: `${selectedEquipment?.statesIdByTime[selectedEquipment?.statesIdByTime?.length-1]?.color}80`}}
                                >
                                    <DollarSign />
                                </div>
                                <p>
                                    <span style={{color: selectedEquipment?.totalEarnings[selectedEquipment?.totalEarnings?.length-1] < 0 ? 'red' : ''}}>{`${selectedEquipment?.totalEarnings[selectedEquipment?.totalEarnings?.length-1]}$`}</span>
                                    <b>Earnings</b>
                                </p>
                            </div>
                            <div className="info1">
                                <div 
                                    className="icon"
                                    style={{backgroundColor: `${selectedEquipment?.statesIdByTime[selectedEquipment?.statesIdByTime?.length-1]?.color}80`}}
                                >
                                    <Percent />
                                </div>
                                <p>
                                    <span>{`${((selectedEquipment?.hoursOfProductivity/totalHours)*100)?.toFixed(2)}%`}</span>
                                    <b>Productivity</b>
                                </p>
                            </div>
                        </section>
                        <section id="graph">
                            <StatesChart selectedEquipment={selectedEquipment} />
                        </section>
                        <section id="datas">
                            <div className="info2">
                                <header>
                                    <p>Positions Log</p>
                                    <button onClick={() => setOpenPositionsLog(!openPositionsLog)}>
                                        {openPositionsLog ? '—' : '+'}
                                    </button>
                                </header>
                                {
                                    openPositionsLog &&
                                    <div>
                                        {
                                            selectedEquipment?.positions.map((position, index) => (
                                                <div 
                                                    key={index} 
                                                    className='position'
                                                >
                                                    <p>{`Date: ${position?.date}`}</p>
                                                    <p>{`Lat: ${position.lat}, Lon: ${position.lon}`}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                            <div className="info2">
                                <header>
                                    <p>States Log</p>
                                    <button onClick={() => setOpenStatesLog(!openStatesLog)}>
                                        {openStatesLog ? '—' : '+'}
                                    </button>
                                </header>
                                {
                                    openStatesLog &&
                                    <div>
                                        {
                                            selectedEquipment?.statesIdByTime.map((state, index) => (
                                                <div 
                                                    key={index} 
                                                    className='position'
                                                >
                                                    <p>{`Date: ${state?.date}`}</p>
                                                    <p>{state?.name}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        </section>
                        <footer>{`Last update: ${selectedEquipment?.lastUpdate}`}</footer>
                    </div>
                </article>
            }
        </div>
    )
}

export default EquipmentsNav