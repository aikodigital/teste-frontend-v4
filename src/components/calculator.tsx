import React, { useState, useEffect } from 'react';
import { Equipment, EquipmentModel, EquipmentState } from '../types';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';

interface CalculatorProps {
    equipmentData?: Equipment[];
    equipmentModelData?: EquipmentModel[];
    equipmentStateData?: EquipmentState[];
}

const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
};

const Calculator: React.FC<CalculatorProps> = ({ equipmentData, equipmentModelData, equipmentStateData }) => {
    const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>('');
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [productivity, setProductivity] = useState<number | null>(null);
    const [earnings, setEarnings] = useState<number | null>(null);

    useEffect(() => {
        if (selectedEquipmentId) {
            const equipmentHistory = equipmentStateHistoryData.find(history => history.equipmentId === selectedEquipmentId);
            if (equipmentHistory) {
                const stateHistory = equipmentHistory.states;
                const dates = Array.from(new Set(stateHistory.map(state => {
                    const date = new Date(state.date);
                    return date.toISOString().split('T')[0];
                }))).sort();

                setAvailableDates(dates.map(date => formatDate(date)));
            } else {
                setAvailableDates([]);
            }
        } else {
            setAvailableDates([]);
        }
    }, [selectedEquipmentId]);

    useEffect(() => {
        setProductivity(null);
        setEarnings(null);
    }, [selectedEquipmentId, selectedDate]);

    const calculateProductivity = () => {
        if (!selectedEquipmentId || !selectedDate) return;

        const equipmentHistory = equipmentStateHistoryData.find(history => history.equipmentId === selectedEquipmentId);
        if (!equipmentHistory) {
            console.warn('Nenhum histórico encontrado para este equipamento.');
            return;
        }

        const formattedSelectedDate = selectedDate.split('-').reverse().join('-');
        const stateHistoryOnSelectedDate = equipmentHistory.states
            .filter(state => {
                const stateDate = new Date(state.date).toISOString().split('T')[0];
                return stateDate === formattedSelectedDate;
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        if (stateHistoryOnSelectedDate.length === 0) {
            console.warn('Nenhum estado encontrado para a data selecionada.');
            return;
        }

        const operatingStateId = '0808344c-454b-4c36-89e8-d7687e692d57';
        let operationalHours = 0;
        let previousDate = new Date(`${formattedSelectedDate}T00:00:00Z`);
        const endOfDay = new Date(`${formattedSelectedDate}T23:59:59.999Z`);
        let isOperating = false;

        for (let i = 0; i < stateHistoryOnSelectedDate.length; i++) {
            const currentState = stateHistoryOnSelectedDate[i];
            const currentDate = new Date(currentState.date);
            if (currentState.equipmentStateId === operatingStateId) {
                if (!isOperating) {
                    previousDate = currentDate;
                    isOperating = true;
                }
            } else {
                if (isOperating) {
                    const duration = (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60);
                    operationalHours += duration;
                    isOperating = false;
                }
                previousDate = currentDate;
            }

            if (i === stateHistoryOnSelectedDate.length - 1 && isOperating) {
                const duration = (endOfDay.getTime() - previousDate.getTime()) / (1000 * 60 * 60);
                if (!isNaN(duration) && duration > 0) {
                    operationalHours += duration;
                }
            }
        }
        const totalHours = 24;
        const percentProductivity = (operationalHours / totalHours) * 100;
        setProductivity(percentProductivity);
    };

    const calculateEarnings = () => {
        if (!selectedEquipmentId || !selectedDate) return;

        const equipmentHistory = equipmentStateHistoryData.find(history => history.equipmentId === selectedEquipmentId);
        if (!equipmentHistory) {
            console.warn('Nenhum histórico encontrado para este equipamento.');
            return;
        }

        const formattedSelectedDate = selectedDate.split('-').reverse().join('-');
        const stateHistoryOnSelectedDate = equipmentHistory.states
            .filter(state => {
                const stateDate = new Date(state.date).toISOString().split('T')[0];
                return stateDate === formattedSelectedDate;
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        if (stateHistoryOnSelectedDate.length === 0) {
            console.warn('Nenhum estado encontrado para a data selecionada.');
            return;
        }

        const endOfDay = new Date(`${formattedSelectedDate}T23:59:59.999Z`);
        let totalEarnings = 0;
        let previousDate = new Date(stateHistoryOnSelectedDate[0].date);
        let i = 0;
        while (i < stateHistoryOnSelectedDate.length - 1) {
            const currentState = stateHistoryOnSelectedDate[i];
            const nextState = stateHistoryOnSelectedDate[i + 1];

            const currentDate = new Date(currentState.date);
            const nextDate = new Date(nextState.date);

            let duration = (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60);
            if (i === 0) {
                const initialDuration = (nextDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60);
                duration = initialDuration;
            }

            const hourlyEarnings = equipmentModelData?.find(model => model.id === equipmentData?.find(e => e.id === selectedEquipmentId)?.equipmentModelId)
                ?.hourlyEarnings.find(e => e.equipmentStateId === currentState.equipmentStateId)?.value || 0;

            const partialEarnings = duration * hourlyEarnings;
            totalEarnings += partialEarnings;
            previousDate = nextDate;
            i++;
        }

        const lastState = stateHistoryOnSelectedDate[stateHistoryOnSelectedDate.length - 1];
        const lastStateStart = new Date(lastState.date);
        const lastStateDuration = (endOfDay.getTime() - lastStateStart.getTime()) / (1000 * 60 * 60);
        const lastStateEarnings = equipmentModelData?.find(model => model.id === equipmentData?.find(e => e.id === selectedEquipmentId)?.equipmentModelId)
            ?.hourlyEarnings.find(e => e.equipmentStateId === lastState.equipmentStateId)?.value || 0;

        const lastStateEarningsTotal = lastStateDuration * lastStateEarnings;

        totalEarnings += lastStateEarningsTotal;
        setEarnings(totalEarnings);
    };

    return (
        <div>
            <h3>Calculadora de Produtividade e Ganhos</h3>
            <div>
                <label>
                    Selecione o Equipamento:
                    <select
                        value={selectedEquipmentId}
                        onChange={(e) => setSelectedEquipmentId(e.target.value)}
                    >
                        <option value="">-- Selecione --</option>
                        {equipmentData?.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            {availableDates.length > 0 && (
                <div>
                    <label>
                        Selecione a Data:
                        <select
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        >
                            <option value="">-- Selecione --</option>
                            {availableDates.map(date => (
                                <option key={date} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            )}

            <button onClick={calculateProductivity} disabled={!selectedEquipmentId || !selectedDate}>
                Calcular Produtividade
            </button>

            <button onClick={calculateEarnings} disabled={!selectedEquipmentId || !selectedDate}>
                Calcular Ganhos
            </button>

            {productivity !== null && (
                <div>
                    <h4>Resultados</h4>
                    <p>Percentual de Produtividade: {productivity.toFixed(2)}%</p>
                </div>
            )}

            {earnings !== null && (
                <div>
                    <h4>Ganho Total</h4>
                    <p>Ganho Total: R$ {earnings?.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default Calculator;
